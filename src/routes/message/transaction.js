const { default: Stripe } = require('stripe')
const transactionSchema = require('../../models/transaction')
const userSchema = require('../../models/user')
require("dotenv").config()
const stripe = require('stripe')(process.env.SECRET_KEY)



module.exports = async function (req, res) {
    const isPaypal = req.body.isPaypal
    const username = req.params.username
    if (isPaypal == "false") {

        let ver = false

        const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
    data:paymentIntent.paymentIntent
  });

    if (ver == true) {
        const user = await userSchema.find({ username: username })
        await userSchema.updateOne({ username: username }, {
            $set: {
                monto: user.monto + req.body.amount
            }
        })
        const result = await transactionSchema.updateOne({ _id: transaction._id }, {
            $set: {
                statusTransaction: "Complete"
            }
        })
        return res.status(200).send({ message: "Order Complete", data: result })
    } else {
        const result = await transactionSchema.updateOne({ _id: transaction._id }, {
            $set: {
                statusTransaction: "Denied"
            }
        })
        return res.status(200).send({ message: "Order Denied", data: result })
    }
}
if (isPaypal == "true") {
    const transaction = new transactionSchema({
        name: req.body.name,
        email: req.body.email,
        monto: req.body.monto,
        statusTransaction: "Pending",
        isPaypal: true,
        nameUser: req.params.username
    })
    const result = await transaction.save()
    res.status(200).send({ message: "Success", Status: "Pending", data: result })
}
return res.status(500).send({ message: "Error request" })
}
