const transactionSchema = require('../../models/transaction')
const userSchema = require('../../models/user')
require("dotenv").config()
const paypal = require("../../middleware/paypal-api")


module.exports = async function (req, res) {
  const orderID = req.body.orderID;
  const idt = req.body.idt
  try {
    const captureData = await paypal.capturePayment(orderID);
    console.log("Esta hecho")
    res.json(captureData);
    await transactionSchema.updateOne({ _id:  idt}, {
      $set: {
        statusTransaction: "Complete"
      }
    })
    const findUser = await transactionSchema.findOne({ _id: idt})
    const user = await userSchema.findOne({ username: findUser.emailUser})
    await userSchema.updateOne({ _id:  idt}, {
      $set: {
        monto: user.monto + findUser.monto
      }
    })
  } catch (err) {
    console.log("Error pa")
    await transactionSchema.updateOne({ _id:  idt}, {
      $set: {
        statusTransaction: "Denied"
      }
    })
    res.status(500).send(err.message);
  }
}
