const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema ({
  side:{type:String, required:true},
  amount:{type:String, required:true},
  price: {type:Number, required:true},
  gtc: {type:Boolean,  default: false},
  expiryDate: { type: Date}
}, { versionKey: false });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;