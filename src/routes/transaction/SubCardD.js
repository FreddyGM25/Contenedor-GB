const transactionSchema = require('../../models/transactionSub')
const userSchema = require('../../models/user')
const stripe = require('stripe')(process.env.KEYSTRIPE)
require("dotenv").config()


module.exports = async function (req, res) {

    try {
        const value = req.body.plan_id
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
            idsub: " ",
            cancel: true
        })
        const result = await transaction.save()
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price: value,
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            success_url: `${process.env.YOUR_DOMAIN}/perfil?idt=${result._id}`,
            cancel_url: `${process.env.YOUR_DOMAIN}/cancel.html`,
        });
        await transactionSchema.updateOne({ _id: result._id }, {
            $set: {
              idsub: session.id
            }
          })
        res.json({ url: session.url })
    } catch (err) {
        res.status(500).send(err.message)
    }
}
