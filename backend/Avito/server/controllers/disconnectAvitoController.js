import { apiAvito } from '../api/index.js';
import { getAccountById } from '../src/helpers/getAccountById.js';

const handleServerError = (res, error) => {
  console.error(error);
  res.status(500).json({ error });
};

const disconnect = (token, userId, res, requestsCount = 1) => {
  apiAvito(token)
    .post(
      '/messenger/v1/webhook/unsubscribe',
      { url: `https://api.my-alert.example/avito/messenger/v3/webhook/${userId}` },
    )
    .then(() => {
      res.status(200).end('Notifications successfully disabled');
    })
    .catch((error) => {
      if (requestsCount < 3) disconnect(token, userId, res, requestsCount + 1);
      else {
        const customErrMsg = `Notifications failed to disconnect for user with id ${userId}`;
        console.error(customErrMsg);
        console.error(error);
        res.status(409).end(customErrMsg);
      }
    });
};

// Disabling notifications (https://developers.avito.ru/api-catalog/messenger/documentation#operation/postWebhookUnsubscribe)

export const disconnectAvitoController = async (req, res) => {
  const { accountId } = req.body;

  try {
    const account = await getAccountById(accountId);
    if (account && account.service === 'avito') {
      const { user_id: userId } = account;
      const { access_token } = account.data;
      disconnect(access_token, userId, res);
    } res.status(204).end('Service is not avito');
  } catch (error) {
    handleServerError(res, error);
  }
};
