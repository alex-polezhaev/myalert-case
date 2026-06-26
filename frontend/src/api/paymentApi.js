import { api } from './index.js';

export const initPayment = () =>
  api()
    .get('/payment/init')
    .then((resp) => {
      window.location.href = resp.data.PaymentURL;
    });

export const cancelSubscription = () => api().post('/payment/cancel');
