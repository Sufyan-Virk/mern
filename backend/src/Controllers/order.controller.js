const Order = require("../Models/order.model");
const { validationResult } = require("express-validator");
const HTTPError = require('../Utils/http-error');

 const creatOrder = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      
      new HTTPError("Invalid inputs passed, please check your data.", 422)
    );
  }
 const {side, amount, price, gtc, expiryDate} = req.body;
  const order = new Order({side, amount, price, gtc, expiryDate});
  try {
    await order.save();
  } catch (err) {
   return next(new HTTPError("Creating Order failed", 500));
  }

  res.status(201).json({success: true, data: order, message:'Order added successfully'});
};

const getOrders = async (req, res, next) => {
  let allOrders;
  try {
    allOrders = await Order.find({});
  } catch (err) {
    return next(new HTTPError("Unable to laod all Orders", 500));
  }
  res.send({success: true, data: allOrders});
};

module.exports = {creatOrder, getOrders}