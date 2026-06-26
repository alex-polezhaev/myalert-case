import axios from 'axios';
import createTinkoffToken from './createTinkoffToken.js';
import { getUserById, createOrder, updateUserById } from './helpers/mongo-helpers.js';

const getKopecks = (rubles) => rubles * 100;

/**
 * @name paymentInit
 * @param userID - mongo user ID
 * @description Function that initializes a payment
 * @link https://www.tinkoff.ru/kassa/dev/payments/#tag/Standartnyj-platyozh/paths/~1Init/post - Standard payment initialization
 * @link https://www.tinkoff.ru/kassa/dev/payments/#tag/Rekurrentnyj-platyozh/paths/~1Charge/post - Recurring auto-payment, one-stage charge. In some cases it changes the initialization.
 */

const paymentInit = async (userID) => {
  const TerminalKey = process.env.TINKOFF_TERM_KEY;
  const Description = 'Payment for the My Alert service';
  const user = await getUserById(userID);
  const Amount = user.trial_used ? getKopecks(299) : getKopecks(1);
  const order = await createOrder(userID, Amount);

  let generalBody = {
    TerminalKey,
    Amount,
    OrderId: order._id,
    Description,
  };
  if (!user.rebill_id) {
    generalBody = { ...generalBody, Recurrent: 'Y', CustomerKey: userID };
  }

  const Token = createTinkoffToken(generalBody);

  const { data } = await axios.post('https://securepay.tinkoff.ru/v2/Init', { ...generalBody, Token });
  if (user.rebill_id) {
    await updateUserById(userID, { is_renewal_payment_in_progress: true });
  }
  return {
    PaymentURL: data.PaymentURL,
    PaymentId: data.PaymentId,
  };
};

export default paymentInit;
