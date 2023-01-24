require("dotenv").config()
const stripe = require('stripe')(process.env.KEYSTRIPE)
const transactionSchema = require('../../models/transaction')
const userSchema = require('../../models/user')

module.exports = async function (req, res) {
    try {
        const user = await userSchema.findOne({username: req.body.username})
        const transaction = new transactionSchema({
            name: req.body.name,
            email: req.body.email,
            monto: req.body.amount,
            statusTransaction: "Pending",
            isPaypal: false,
            emailUser: user.email
        })
        const result = await transaction.save()
        const value = req.body.plan_id
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: [
                {
                    price: value,
                    quantity: 1,
                },
            ],
            success_url: `${process.env.YOUR_DOMAIN}/lista-regalos?idt=${result._id}`,
            cancel_url: `${process.env.YOUR_DOMAIN}`,
        })
        res.json({ url: session.url })
    } catch (e) {
        res.status(500).json({ error: e.message })
    }

}
