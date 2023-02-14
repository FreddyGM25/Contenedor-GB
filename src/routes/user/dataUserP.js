const userSchema = require('../../models/user')
const { TokenVerify } = require('../../middleware/autentication')
const { SeeM } = require('./dataMessage')

module.exports = async function (req, res) {
    if (req.params.username) {
        const user = await userSchema.findOne({username:req.params.username.toLowerCase()})
        if(user == null) return res.status(200).send({ response: "Error", error: "El nombre de usuario no existe"})
        const message = await SeeM(user.email)
        return res.status(200).send({response: "Success", user: user, message: message })
    }else{
        return res.status(200).send({response: "Error", error: "Error en el nombre de usuario"})
    }


}