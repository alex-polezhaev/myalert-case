import { CronJob } from 'cron';
import { DateTime } from 'luxon';
import axios from 'axios';
import { api } from '../../api/index.js';

export const updateAvitoTokens = new CronJob('*/5 * * * *', async () => {
  // Take all Avito accounts and check each one's token expiration date
  // If the date is in the past, request a token refresh from Avito
  // depending on the authorization type

  const accounts = await api('mongo')
    .put('accounts/find_by_query', { service: 'avito' })
    .then((resp) => resp.data);

  accounts.forEach((account) => {
    const { data } = account;

    /** Markers */
    let shouldUpdate = false;
    const authType = data.auth_type;

    if (!authType) {
      console.error('Try to update avito token without authType');
      return null;
    }

    try {
      /** Prepare date */
      const now = DateTime.now().setZone('Europe/Moscow');
      const deadline = now.plus({ hour: 4 }); // Buffer 4 hours to update token
      const expireDate = DateTime.fromISO(data.token_expire_at, {
        zone: 'Europe/Moscow',
      });

      /** Need to update? */
      if (deadline > expireDate) shouldUpdate = true;

      if (shouldUpdate) console.log(`try to update avito token - ${account.title}`);

      /** Variant 1 */
      if (shouldUpdate && authType === 'client_credentials') {
        const { clientId, clientSecret } = data;

        if (!clientId || !clientSecret) {
          console.error(
            'Try to update avito token by client_credentials without clientId or clientSecret',
          );
          return null;
        }

        return (
          axios
            .post(
              'https://api.avito.ru/token',
              {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
              },
              {
                params: {
                  grant_type: 'client_credentials',
                  client_id: clientId,
                  client_secret: clientSecret,
                },
              },
            )
            /** Update token  */
            .then((resp) =>
              api('mongo').put('accounts/update_by_query', {
                query: { _id: account._id },
                update: {
                  'data.access_token': resp.data.access_token,
                  'data.token_expire_at': DateTime.utc().plus({ hour: 24 }),
                },
              }))
        );
      }

      /** Variant 2 */
      if (shouldUpdate && authType === 'authorization_code') {
        const { refresh_token } = data;

        if (!refresh_token) {
          console.error(
            'Try to update avito token by authorization_code without refresh_token',
          );
          return null;
        }

        return (
          axios
            .post(
              'https://api.avito.ru/token',
              {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
              },
              {
                params: {
                  grant_type: 'refresh_token',
                  client_id: process.env.AVITO_CLIENT_ID,
                  client_secret: process.env.AVITO_CLIENT_SECRET,
                  refresh_token,
                },
              },
            )
            /** Update token  */
            .then((resp) =>
              api('mongo').put('accounts/update_by_query', {
                query: { _id: account._id },
                update: {
                  'data.access_token': resp.data.access_token,
                  'data.refresh_token': resp.data.refresh_token,
                  'data.token_expire_at': DateTime.utc().plus({ hour: 24 }),
                },
              }))
        );
      }

      return null;
    } catch (err) {
      console.error('Cause error when try to update avito token');
      console.error(err.message);
    }
  });
});
