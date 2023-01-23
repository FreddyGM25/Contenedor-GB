const transactionSchema = require('../../models/transactionSub')
const userSchema = require('../../models/user')
require("dotenv").config()
const paypal = require("../../middleware/paypal-api")
const { TokenVerify } = require('../../middleware/autentication')


module.exports = async function (req, res) {
    console.log("Entro")
    const token = req.headers.authorization.split(' ').pop()
    const tokenver = await TokenVerify(token)
    if (tokenver) {
        const user = await userSchema.findById(tokenver._id)
        const transaction = await transactionSchema.findOne({ email: user.email, cancel: false })
        if(!transaction) return res.status(200).send({ response: "Error", message: "Esta suscripcion ya ha sido cancelada" })
        if (transaction.isPaypal == true) {
            await paypal.suspendSubs(transaction.idsub)
            await transactionSchema.updateOne({ _id: transaction._id }, {
                $set: {
                    cancel: true
                }
            })
            return res.status(200).send({ response: "Success", message: "Se cancelo correctamente" })
        }
    } return res.status(200).send({ response: "Error", message: "Se requiere autenticacion" })
}
