const transactionSchema = require('../../models/transactionSub')
const userSchema = require('../../models/user')
require("dotenv").config()
const { addDays } = require('../../middleware/adddays')


module.exports = async function (req, res) {
    try {
        const idt = req.body.idt
        const findUser = await transactionSchema.findOne({ _id: idt })
        if (findUser.statusTransaction == "Complete") return res.status(200).send({ response: "Error", message: "Donacion ya realizada" })
        const session = await stripe.checkout.sessions.retrieve(
            findUser.idsub
          );
        await transactionSchema.updateOne({ _id: idt }, {
            $set: {
                idsub: session.subscription,
                statusTransaction: "Complete",
                
            }
        })
        const transaction = await transactionSchema.findById(idt)
        const user = await userSchema.findOne({email: transaction.emailUser})
        if (transaction.namep == "PRO1YEAR") {
            const date = new Date(Date.now())
            const newdate = addDays(365)
            await userSchema.updateOne({ _id: user._id }, {
                $set: {
                    isPro: true,
                    dateB: date,
                    dateF: newdate
                }
            })
            return res.json(transaction)
        } else if (transaction == "PRO1MONTH") {
            const date = new Date(Date.now())
            const newdate = addDays(30)
            await userSchema.updateOne({ _id: user._id }, {
                $set: {
                    isPro: true,
                    dateB: date,
                    dateF: newdate
                }
            })
            return res.json(transaction)
        }
    } catch (err) {
        res.status(500).send(err.message)
    }
}
