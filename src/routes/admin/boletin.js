const userSchema = require('../../models/user')
const { TokenVerify } = require('../../middleware/autentication')
const { getTemplate, sendEmail } = require('../../middleware/email')

module.exports = async function (req, res) {


    const token = req.headers.authorization.split(' ').pop()
    if (token != "null") {
        const tokenver = await TokenVerify(token)
        const admin = await userSchema.findById(tokenver._id)
        if (admin.isAdmin == true) {
            const users = await userSchema.find()
            for (let user in users) {
                if (users[user].isAdmin == true) {
                    user++
                } else {
                    console.log(users[user].name)
                    const template = getTemplate(users[user].name, "", req.body.URL, req.body.texto, 3);
                    sendEmail(users[user].email, template, 3, req.body.asunto);
                }
            }
            return res.status(200).send({ response: "Success", message: "Correo enviado correctamente" })
        } else {
            return res.status(200).send({ response: "Error", message: "Este es un usuario normal" })
        }
    } else {
        return res.status(200).send({ response: "Error", message: "Esta operacion requiere autenticacion" })
    }
}