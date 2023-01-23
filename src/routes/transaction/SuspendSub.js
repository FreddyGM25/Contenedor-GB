const transactionSchema = require('../../models/transactionSub')
const userSchema = require('../../models/user')
require("dotenv").config()
const paypal = require("../../middleware/paypal-api")
const { TokenVerify } = require('../../middleware/autentication')


module.exports = async function (req, res) {
    const token = req.headers.authorization.split(' ').pop()
    const tokenver = await TokenVerify(token)
    if (tokenver) {
        const user = await userSchema.findById(tokenver._id)
        const transaction = await transactionSchema.find({ email: user.email })
        const subs = transaction[transaction.length-1]
        if (subs.isPaypal == true) {
            await paypal.suspendSubs(subs.idsub)
            await userSchema.updateOne({ _id: user._id }, {
                $set: {
                    isPro: true,
                    dateB: date,
                    dateF: newdate
                }
            })
            return res.status(200).send({ response: "Success", message: "Se cancelo correctamente" })
        }
    } return res.status(200).send({ response: "Error", message: "Se requiere autenticacion" })
}
