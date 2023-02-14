const userSchema = require('../../models/user')
const { TokenVerify } = require('../../middleware/autentication')
const { SeeMP } = require('./dataMessage')

module.exports = async function (req, res) {
    const token = await req.headers.authorization.split(' ').pop()
    const tokenver = await TokenVerify(token)
    if (tokenver) {
        const user = await userSchema.findById(tokenver._id)
        if(user == null) return res.status(501).send({response: "Error", message: "Este nombre de usuario no existe"})
        const message = await SeeMP(user.email)
        return res.status(200).send({response: "Success", user: user, message: message })
    }else{
        return res.status(200).send({response: "Error", error: "Se requiere autenticacion"})
    }

}