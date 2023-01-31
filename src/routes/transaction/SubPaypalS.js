const transactionSchema = require('../../models/transactionSub')
const userSchema = require('../../models/user')
require("dotenv").config()
const paypal = require("../../middleware/paypal-api")
const { addDays } = require('../../middleware/adddays')


module.exports = async function (req, res) {
  try {
    const user = await userSchema.findOne({ username: req.body.username })
    const ver = await transactionSchema.findOne({ email: user.email , cancel:false})
    if(ver) res.status(200).send({response: "Error", message: "Esta cuenta ya cuenta con una suscripcion"});
    const details = await paypal.detailsSubs(req.body.plan_id)
    const transaction = new transactionSchema({
      name: user.name,
      email: user.email,
      namep: details.product_id,
      statusTransaction: "Complete",
      isPaypal: true,
      idsub: req.body.subscriptionID,
      cancel:false
    })
    await transaction.save()
    if (details.product_id == "PRO1YEAR") {
      const date = new Date(Date.now())
      const newdate = addDays(365)
      await userSchema.updateOne({ _id: user._id }, {
        $set: {
          isPro: true,
          dateB: date,
          dateF: newdate
        }
      })
      return res.json(transaction)
    } else if (details.product_id == "PRO1MONTH") {
      const date = new Date(Date.now())
      const newdate = addDays(30)
      await userSchema.updateOne({ _id: user._id }, {
        $set: {
          isPro: true,
          dateB: date,
          dateF: newdate
        }
      })
      return res.json(transaction)
    }
  } catch (err) {
    res.status(500).send(err.message)
  }
}
