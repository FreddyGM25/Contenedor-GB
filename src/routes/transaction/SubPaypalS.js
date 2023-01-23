const transactionSchema = require('../../models/transactionSub')
const userSchema = require('../../models/user')
require("dotenv").config()
const paypal = require("../../middleware/paypal-api")
const { addDays } = require('../../middleware/adddays')


module.exports = async function (req, res) {
  const user = await userSchema.findOne({username: req.body.username})
  try {
    ver = transactionSchema.findOne({email:user.email})
    const details = await paypal.detailsSubs(req.body.plan_id)
    const transaction = new transactionSchema({
      name: user.name,
      email: user.email,
      namep: details.product_id,
      statusTransaction: "Complete",
      isPaypal: true,
      idsub: req.body.subscriptionID
    })
    await transaction.save()
    const date = new Date(Date.now())
    const newdate = addDays(365)
        await userSchema.updateOne({ _id: user._id }, {
            $set: {
                isPro: true,
                dateB: date,
                dateF: newdate
            }
        })
    return res.json(transaction);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
