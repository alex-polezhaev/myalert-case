import {
  updateUserById, getOrderById, removeRebillId, getUserById, updateOrderById,
} from '../src/helpers/mongo-helpers.js';
import paymentInit from '../src/paymentInit.js';
import createValidExpiresAt from '../src/createValidExpiresAt.js';
import checkToken from '../src/checkToken.js';

const handleServerError = (res, error) => {
  console.error(error);
  res.status(500).json({ error });
};

const handleAsyncServerError = (res) => (error) => {
  console.error(error);
  res.status(500).json({ error });
};

/**
 * TINKOFF PAYMENT INIT
 * --------------------
 * Using to get tinkoff payment link or payment id
 * @method GET
 * @route /payment/init
 * @return tinkoff payment link or message
 * @link https://www.tinkoff.ru/kassa/dev/payments/#tag/Rekurrentnyj-platyozh/paths/~1v2~1Charge/post - One-stage charge for recurring payments
 */
export const paymentInitController = (req, res) => {
  try {
    const { user_id: userID } = req.headers;
    if (!userID) {
      res.status(400).end('Invalid userID');
      return;
    }
    paymentInit(userID)
      .then(({ PaymentURL }) => {
        res.status(200).json({ PaymentURL });
      }).catch(handleAsyncServerError(res));
  } catch (error) {
    handleServerError(res, error);
  }
};

/**
 * TINKOFF PAYMENT NOTIFICATION HANDLER
 * --------------------
 * Order payment notification handler
 * @method POST
 * @route /notify
 * @return status 200 and OK
 * @link https://www.tinkoff.ru/kassa/dev/payments/#tag/Notifikacii-Merchanta-ob-operaciyah - Merchant notifications about operations
 */
export const notificationController = async (req, res) => {
  try {
    const {
      Status,
      RebillId,
      OrderId,
      Amount,
      Token,
      TerminalKey,
      Success,
      PaymentId,
      ErrorCode,
      CardId,
      Pan,
      ExpDate,
    } = req.body;

    const tokenBody = {
      TerminalKey,
      OrderId,
      Success,
      Status,
      PaymentId,
      ErrorCode,
      Amount,
      CardId,
      Pan,
      ExpDate,
    };
    let isTokenValid = false;
    if (RebillId) {
      isTokenValid = checkToken(Token, { ...tokenBody, RebillId });
    } else {
      isTokenValid = checkToken(Token, tokenBody);
    }
    if (!isTokenValid) return res.status(401).end('Authentication required');

    const order = await getOrderById(OrderId);
    const user = await getUserById(order.user_id);
    const userID = user._id;
    const orderID = order._id;
    const amountInRubles = +Amount / 100;

    const negativeStatuses = [
      'PARTIAL_REVERSED',
      'REVERSED',
      'PARTIAL_REFUNDED',
      'REFUNDED',
      'REJECTED',
      '3DS_CHECKING',
    ];

    // AUTHORIZED status is skipped

    if (Status === 'CONFIRMED') {
      if (
        (amountInRubles === 1 && user.trial_used === false)
        || (amountInRubles === 299 && user.trial_used === true)
      ) {
        const validExpiresAt = createValidExpiresAt(user.expires_at);
        await updateUserById(userID, {
          rebill_id: RebillId,
          trial_used: true,
          expires_at: validExpiresAt,
          card: {
            pan: Pan,
            exp_date: ExpDate,
          },
        });
        await updateOrderById(orderID, {
          success: true,
        });
      } else console.error('Unhandled payment error');
    } else if (negativeStatuses.includes(Status)) {
      await removeRebillId(userID);
      await updateOrderById(orderID, {
        success: false,
      });
    }

    await updateUserById(userID, { is_renewal_payment_in_progress: false });
    res.status(200).end('OK');
  } catch (error) {
    handleServerError(res, error);
  }
};

/**
 * SUBSCRIPTION CANCELLATION
 * --------------------
 * @method POST
 * @route /cancel
 * @return status 200
 */
export const subscriptionCancellationController = async (req, res) => {
  try {
    const { user_id: userID } = req.headers;
    if (!userID) {
      res.status(400).end('Invalid userID');
      return;
    }
    await removeRebillId(userID)
      .then(() => {
        res.status(200).end('Subscription successfully canceled');
      });
  } catch (error) {
    handleServerError(res, error);
  }
};
