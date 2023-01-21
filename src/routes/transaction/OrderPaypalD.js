const transactionSchema = require('../../models/transaction')
const userSchema = require('../../models/user')
require("dotenv").config()
const paypal = require("../../middleware/paypal-api")


module.exports = async function (req, res) {
    console.log("entre")
    try {
        const order = await paypal.createOrder(req.body.amount);
        res.json(order);
      } catch (err) {
        res.status(500).send(err.message);
      }
}
