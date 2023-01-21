const transactionSchema = require('../../models/transaction')
const userSchema = require('../../models/user')
require("dotenv").config()
const paypal = require("../../middleware/paypal-api")


module.exports = async function (req, res) {
  const { orderID } = req.params;
  const user = await userSchema.findOne({username: req.body.username})
  try {
    const captureData = await paypal.capturePayment(orderID);
    const transaction = new transactionSchema({
      name: req.body.name,
      email: req.body.email,
      monto: req.body.amount,
      statusTransaction: "Complete",
      isPaypal: true,
      emailUser: user.email
    })
    await transaction.save()
    console.log(user.money + transaction.monto)
    await userSchema.updateOne({ _id: user._id }, {
      $set: {
        money: user.money + transaction.monto
      }
    })
    return res.json(captureData);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
