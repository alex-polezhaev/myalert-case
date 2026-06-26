/* eslint-disable no-new */
import { CronJob } from 'cron';
import { getAllUsers } from './helpers/mongo-helpers.js';
import paymentInit from './paymentInit.js';
import checkExpiresAt from './checkExpiresAt.js';
import charge from './charge.js';

const cronAutoPayment = () => {
  try {
    new CronJob(
      '* * * * *',
      async () => {
        try {
          const users = await getAllUsers();
          users.forEach((user) => {
            const {
              _id: id,
              rebill_id: RebillId,
              expires_at: expiresAt,
              is_renewal_payment_in_progress: isRenewalPaymentInProgress,
            } = user;

            if (RebillId) {
              const isExpiresSoonOrExpired = checkExpiresAt(expiresAt);
              if (isExpiresSoonOrExpired && !isRenewalPaymentInProgress && RebillId) {
                paymentInit(id)
                  .then(({ PaymentId }) => {
                    const chargeBody = {
                      TerminalKey: process.env.TINKOFF_TERM_KEY,
                      PaymentId,
                      RebillId,
                    };
                    charge(chargeBody);
                  });
              }
            }
          });
        } catch (error) {
          console.error(error);
        }
      },
      null,
      true,
      'Europe/Moscow',
    );
  } catch (error) {
    console.error(error);
  }
};

const runAllCronJobs = () => {
  cronAutoPayment();
};

export default runAllCronJobs;
