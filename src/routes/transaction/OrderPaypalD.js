const transactionSchema = require('../../models/transaction')
const userSchema = require('../../models/user')
require("dotenv").config()
const paypal = require("../../middleware/paypal-api")


module.exports = async function (req, res) {
    const amount = req.body.monto
    const user = await userSchema.findOne({username:req.params.username}) 
    try {
            const transaction = new transactionSchema({
                name: req.body.name,
                email: req.body.email,
                monto: req.body.monto,
                statusTransaction: "Pending",
                isPaypal: true,
                emailUser: user.email
            })
            await transaction.save()
            const order = await paypal.createOrder(amount)
            return res.status(200).send({order: order, Transaction: transaction._id})
    } catch (err) {
        return res.status(500).send(err.message);
    }
}
