require("dotenv").config()
const stripe = require('stripe')(process.env.KEYSTRIPE)
const transactionSchema = require('../../models/transaction')
const userSchema = require('../../models/user')

module.exports = async function (req, res) {
    try {
        let datap = {
            name: req.body.name,
            email: req.body.email,
            amount: req.body.amount,
            username: req.body.username,
        }
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
            success_url: `${process.env.YOUR_DOMAIN}/lista-regalos`,
            cancel_url: `${process.env.YOUR_DOMAIN}`,
        })
        res.status(200).json({response:"Success", data: datap })
    } catch (e) {
        res.status(500).json({ error: e.message })
    }

}
