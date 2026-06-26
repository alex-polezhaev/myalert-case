import axios from 'axios';
import createTinkoffToken from './createTinkoffToken.js';
import { updateOrderById } from './helpers/mongo-helpers.js';

/**
 * @name charge
 * @param body - Request body required to create the token
 * @description Method that finalizes the recurring payment process
 * @link https://www.tinkoff.ru/kassa/dev/payments/#tag/Rekurrentnyj-platyozh - Charge method
 */

const charge = (body) => {
  const chargeURL = 'https://securepay.tinkoff.ru/v2/Charge';
  const Token = createTinkoffToken(body);
  axios
    .post(chargeURL, { ...body, Token })
    .then((resp) => {
      const {
        Status,
        OrderId,
      } = resp.data;

      if (Status === 'CONFIRMED') updateOrderById(OrderId, { success: true });
      else if (Status === 'REJECTED') updateOrderById(OrderId, { success: false });
    })
    .catch((error) => {
      console.error(error);
    });
};

export default charge;
