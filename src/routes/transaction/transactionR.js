const userSchema = require('../../models/user')
const transactionSchema = require('../../models/transactionR')
const { TokenVerify } = require('../../middleware/autentication')

module.exports = async function (req, res) {
    const token = req.headers.authorization.split(' ').pop()
    const tokenver = await TokenVerify(token)
    if (tokenver) {
        const user = await userSchema.findById(tokenver._id)
        if(!user.isPro) return res.status(200).send({response: "Error", message: "Esta operacion es solo para usuarios PRO" })
        if(req.body.monto == "null") return res.status(200).send({response: "Error", message: "Se requiere el monto" })
        if(req.body.email == "") return res.status(200).send({response: "Error", message: "Se requiere el correo PayPal" })
        if(Number(req.body.monto) < 100 || Number(req.body.monto) < 0) return res.status(200).send({response: "Error", message: "Solo se puede retirar a partir de US$100" })
        if (user.money < Number(req.body.monto)) return res.status(200).send({response: "Error", message: "Monto insuficiente" })
        const transaction = new transactionSchema({
            name: user.name,
            email: req.body.email,
            monto: req.body.monto,
            createdAt: Date.now(),
            statusTransaction: "Pending",
            emailUser: user.email
        })
        const result = await transaction.save()
        await userSchema.updateOne({ _id: user._id }, {
            $set: {
                money: user.money - Number(req.body.monto)
            }
        })
        return res.status(200).send({ response: "Success", message: "Retiro completado, este monto retirado se vera reflejado en la cuenta PayPal dentro dos a tres dias habiles" })
    } else {
        return res.status(200).send({ response: "Error", message: "esta operacion requiere autenticacion" })
    }
}
