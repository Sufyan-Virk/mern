const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const {creatOrder, getOrders} = require("../Controllers/order.controller")

router.get("/", getOrders)
router.post(
  "/create",
  [
    check("price").isNumeric().withMessage('should be a number'),
    check("side").notEmpty().withMessage('must add'),
    check("amount").notEmpty().withMessage('must add')
  ],
  creatOrder
);

module.exports = router;