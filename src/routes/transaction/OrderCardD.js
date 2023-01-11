require("dotenv").config()
const stripe = require('stripe')(process.env.KEYSTRIPE)
const transactionSchema = require('../../models/transaction')

module.exports = async function (req, res) {
    const transaction = new transactionSchema({
        name: req.body.name,
        email: req.body.email,
        monto: req.body.monto,
        statusTransaction: "Pending",
        isPaypal: false,
        nameUser: req.params.username
    })
    await transaction.save()
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                price: `${process.env.PRICEID}`,
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `${process.env.YOUR_DOMAIN}/success.html`,
        cancel_url: `${process.env.YOUR_DOMAIN}/cancel.html`,
    });
    res.redirect(303, session.url);
}
