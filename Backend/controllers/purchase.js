const Razorpay = require("razorpay");

const Order = require("../models/orders");

const purchasePremium = async (req, res, next) => {
  try {
    const rzp = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const amount = 2500;

    rzp.orders.create({ amount, currency: "INR" }, async (err, order) => {
      if (err) {
        throw new Error(JSON.stringify(err));
      }

      const result = await req.user.createOrder({
        orderid: order.id,
        status: "PENDING",
      });

      return res.status(201).json({ result, key_id: rzp.key_id });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, err });
  }
};

const updateTransactionStatus = async (req, res, next) => {
  try {
    console.log("Inside updateTransaction");
    const { payment_id, order_id } = req.body;

    const order = await Order.findOne({ where: { orderid: order_id } });

    const updateOrder = async (order) => {
      await order.update({
        paymentid: payment_id,
        status: "SUCCESS",
      });
    };

    const updateUser = async () => {
      await req.user.update({ ispremiumuser: true });
    };

    Promise.all([updateOrder(order), updateUser()])
      .then((result) => {
        return res
          .status(202)
          .json({ success: true, message: "Transaction Successful", result });
      })
      .catch((err) => {
        throw new Error(JSON.stringify(err));
      });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Transaction failed", err });
  }
};

exports.purchasePremium = purchasePremium;
exports.updateTransactionStatus = updateTransactionStatus;
