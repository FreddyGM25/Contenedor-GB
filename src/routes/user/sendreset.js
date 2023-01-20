const userSchema = require('../../models/user')
const { TokenAssign } = require('../../middleware/autentication')
const { getTemplate, sendEmail } = require('../../middleware/email')

module.exports = async function (req, res) {
    const user = await userSchema.findOne({ email: req.body.email })
    if (user != null) {
        if(user.isActive == false) return res.status(200).send({response: "Error", message: "Este usuario no esta activado" })
        const token = await TokenAssign(user)
        const template = getTemplate(user.name, token,  "", "", 2);
        const resp = await sendEmail(user.email, template, 2, "");
        if(resp == false) return res.status(200).send({response: "Error", message: "Error al enviar el email"})
        console.log(token)
        return res.status(200).send({response: "Success", message: "Contraseña enviada correctamente"})
    } else {
        return res.status(200).send({response: "Error", message: "El usuario no existe" })
    }

}
