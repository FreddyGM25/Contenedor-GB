const transactionSchema = require('../../models/transaction')
require("dotenv").config()
const paypal = require("../../middleware/paypal-api")


module.exports = async function (req, res) {
    const amount = req.body.amount
    try {
            const transaction = new transactionSchema({
                name: req.body.name,
                email: req.body.email,
                monto: req.body.monto,
                statusTransaction: "Pending",
                isPaypal: true,
                nameUser: req.params.username
            })
            await transaction.save()
            const order = await paypal.createOrder(amount)
            return res.status(200).send({order: order, Transaction: transaction._id})
    } catch (err) {
        return res.status(500).send(err.message);
    }
}
