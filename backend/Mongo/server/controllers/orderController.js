import mongoose from 'mongoose'; /* eslint-disable-line import/no-unresolved */
import Order from '../models/Payment/Order.js';

const handleServerError = (res, error) => {
  console.error(error);
  res.status(500).json({ error });
};

export const getOrderByIdController = (req, res) => {
  try {
    const { orderID } = req.params;
    if (!orderID) {
      res.status(400).end('Empty orderID');
      return;
    }
    Order.findById(orderID).then((order) => {
      if (order) res.status(200).json(order);
      else res.status(404).end('Order is not found');
    });
  } catch (error) {
    handleServerError(res, error);
  }
};

export const createOrderController = (req, res) => {
  try {
    const { userID, amount } = req.body;
    if (!userID || !amount) {
      res.status(400).end('Invalid userID or amount');
      return;
    }
    new Order({ user_id: userID, amount })
      .save()
      .then((order) => res.status(200).json(order))
      .catch((err) => res.status(400).end(err));
  } catch (error) {
    handleServerError(error);
  }
};

export const updateOrderByIdController = async (req, res) => {
  const payload = req.body;
  const { orderID } = req.params;

  // Reject if the payload is empty
  if (Object.keys(payload).length === 0 || !payload) {
    return res.status(400).end('empty body payload');
  }

  // Reject if the id does not look like a mongo id
  if (!mongoose.Types.ObjectId.isValid(orderID)) {
    return res.status(400).end('invalid mongo id');
  }

  try {
    const order = await Order.findByIdAndUpdate(orderID, payload, {
      new: true,
    });

    if (order) res.status(200).json(order);
    else res.status(404).end('order not found');
  } catch (error) {
    handleServerError(res, error);
  }
};
