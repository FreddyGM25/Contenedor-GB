const messageSchema = require('../../models/message')
const { TokenVerify } = require('../../middleware/autentication')
const userSchema = require('../../models/user')

module.exports = async function (req, res) {
    const token = req.headers.authorization.split(' ').pop()
    const tokenver = await TokenVerify(token)
    if (tokenver) {
        const message = await messageSchema.findById(req.params.id)
        const user = await userSchema.findOne({email: message.emailUser})
        return res.status(200).send({ response: "Success", data: message, user: user.username})
    } else {
        return res.status(500).send({ response: "Success", message: "Esta operacion requiere autenticacion" })
    }
}
