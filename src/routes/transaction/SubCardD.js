const transactionSchema = require('../../models/transactionSub')
const userSchema = require('../../models/user')
const stripe = require('stripe')(process.env.KEYSTRIPE)
require("dotenv").config()


module.exports = async function (req, res) {

    try {
        const value = req.body.plan_id
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                    price: value,
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            success_url: `${process.env.YOUR_DOMAIN}/profile`,
            cancel_url: `${process.env.YOUR_DOMAIN}/cancel.html`,
        });
        res.json({ url: session.url })
        const user = await userSchema.findOne({ username: req.body.username })
        const plan = await stripe.plans.retrieve(
            value
        )
        let name
        switch (plan.amount) {
            case 9900: name = "PRO1YEAR"
                break
            case 1000: name = "PRO1MONTH"
                break
        }
        const transaction = new transactionSchema({
            name: user.name,
            email: user.email,
            namep: name,
            statusTransaction: "Pending",
            isPaypal: false,
            idsub: session.id,
            cancel: false
        })
        const result = await transaction.save()

    } catch (err) {
        res.status(500).send(err.message)
    }
}
