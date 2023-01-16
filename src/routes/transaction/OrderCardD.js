require("dotenv").config()
const stripe = require('stripe')(process.env.KEYSTRIPE)
const transactionSchema = require('../../models/transaction')
const userSchema = require('../../models/user')

module.exports = async function (req, res) {
    const user = await userSchema.findOne({username:req.params.username}) 
    const transaction = new transactionSchema({
        name: req.body.name,
        email: req.body.email,
        monto: req.body.monto,
        statusTransaction: "Pending",
        isPaypal: true,
        emailUser: user.email
    })
    await transaction.save()
    if(req.body.status == "1"){
        await stripe.checkout.sessions.create({
            line_items: [
                {
                    price: `${process.env.PRICEID1}`,
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.YOUR_DOMAIN}/success.html`,
            cancel_url: `${process.env.YOUR_DOMAIN}/cancel.html`,
        });
        res.status(200).redirect(303, session.url);
    }
    if(req.body.status == "2"){
        await stripe.checkout.sessions.create({
            line_items: [
                {
                    price: `${process.env.PRICEID2}`,
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.YOUR_DOMAIN}/success.html`,
            cancel_url: `${process.env.YOUR_DOMAIN}/cancel.html`,
        });
        res.status(200).redirect(303, session.url);
    }
    if(req.body.status == "3"){
        await stripe.checkout.sessions.create({
            line_items: [
                {
                    price: `${process.env.PRICEID3}`,
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.YOUR_DOMAIN}/success.html`,
            cancel_url: `${process.env.YOUR_DOMAIN}/cancel.html`,
        });
        res.status(200).redirect(303, session.url);
    }

    
}
