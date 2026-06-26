import axios from 'axios';
import { DateTime } from 'luxon';
import { api, apiAvito } from '../api/index.js';
import { getProfile } from '../src/helpers/getProfile.js';

// const handleServerError = (res, error) => {
//   console.error(error);
//   res.status(500).json({ error });
// };

export const connectAvitoController = async (req, res) => {
  const { clientId, clientSecret } = req.body;
  const { user_id: userId } = req.headers;

  try {
    if (!clientId || !clientSecret) {
      res.status(400).end('Invalid body');
      return;
    }

    // Collect avito data
    const { access_token, refresh_token } = await axios
      .post(
        'https://api.avito.ru/token',
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        },
        {
          params: {
            grant_type: 'client_credentials',
            client_id: clientId,
            client_secret: clientSecret,
          },
        },
      )
      .then((response) => response.data);

    const profile = await getProfile(access_token);

    // Check does account already created
    const exist = await api('mongo')
      .put('accounts/find_by_query', {
        'data.id': profile.id,
      })
      .then(() => true)
      .catch(({ response }) => response.status !== 404);

    if (exist) {
      res.status(409).end('Account already exist');
      return null;
    }

    // Enabling notifications (https://developers.avito.ru/api-catalog/messenger/documentation#operation/postWebhookV3)
    await apiAvito(access_token)
      .post('/messenger/v3/webhook', {
        url: `https://api.my-alert.example/avito/messenger/v3/webhook/${userId}`,
      })
      .catch((error) => {
        console.error(
          `Notifications failed to connect for user with id ${userId}`,
        );
        console.error(error);
      });

    // Creating mongo account
    const payload = {
      service: 'avito',
      could_be_input: true,
      could_be_output: true,
      title: `Avito - ${profile.name}`,
      user_id: userId,
      data: {
        auth_type: 'client_credentials',
        access_token,
        token_expire_at: DateTime.utc().plus({ hour: 24 }),
        clientId,
        clientSecret,
        ...profile,
      },
    };
    await api('mongo').post('accounts/new_account', payload);
    res.status(201).end('Account created');
  } catch (error) {
    console.error(error); // error can be caused by incorrect avito data
    res.status(400).json({ error });
  }
};

export const catchCodeAvitoController = async (req, res) => {
  const { code, state: userId } = req.query;

  try {
    const { access_token, refresh_token } = await axios
      .post(
        'https://api.avito.ru/token',
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        },
        {
          params: {
            grant_type: 'authorization_code',
            client_id: process.env.AVITO_CLIENT_ID,
            client_secret: process.env.AVITO_CLIENT_SECRET,
            code,
          },
        },
      )
      .then((response) => response.data);

    const profile = await getProfile(access_token);

    // Check does account already created
    const exist = await api('mongo')
      .put('accounts/find_by_query', {
        'data.id': profile.id,
      })
      .then(() => true)
      .catch(({ response }) => response.status !== 404);

    if (exist) {
      res.status(409).redirect('https://my-alert.example/accounts');
      return null;
    }

    // Enabling notifications (https://developers.avito.ru/api-catalog/messenger/documentation#operation/postWebhookV3)
    await apiAvito(access_token)
      .post('/messenger/v3/webhook', {
        url: `https://api.my-alert.example/avito/messenger/v3/webhook/${userId}`,
      })
      .catch((error) => {
        console.error(
          `Notifications failed to connect for user with id ${userId}`,
        );
        console.error(error);
      });

    // Creating mongo account
    const payload = {
      service: 'avito',
      could_be_input: true,
      could_be_output: true,
      title: `Avito - ${profile.name}`,
      user_id: userId,
      data: {
        auth_type: 'authorization_code',
        access_token,
        refresh_token,
        token_expire_at: DateTime.utc().plus({ hour: 24 }),
        ...profile,
      },
    };
    await api('mongo').post('accounts/new_account', payload);
    res.status(201).redirect('https://my-alert.example/accounts');
  } catch (error) {
    console.error(error); // error can be caused by incorrect avito data
    res.status(400).json({ error });
  }
};
