const userSchema = require('../../models/user')
const transactionSchema = require('../../models/transaction')
const { TokenVerify } = require('../../middleware/autentication')

module.exports = async function (req, res) {
    const token = req.headers.authorization.split(' ').pop()
    if (token != "null") {
        const tokenver = await TokenVerify(token)
        const admin = await userSchema.findById(tokenver._id)
        if (admin.isAdmin == true) {
            const result = await transactionSchema.find()
            const total = result.reduce(
                (accumulator, currentValue) => accumulator + currentValue.monto,
                0       
              )
              return res.status(200).send({ response: "Success", total:total })
        } else {
            return res.status(200).send({ response: "Error", message: "Este es un usuario normal" })
        }
    } else {
        return res.status(200).send({ response: "Error", message: "Esta operacion requiere autenticacion" })
    }
}