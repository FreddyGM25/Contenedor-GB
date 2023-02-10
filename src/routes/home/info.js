const userSchema = require('../../models/user')
const homeSchema = require('../../models/home')
const { TokenVerify } = require('../../middleware/autentication')

module.exports = async function (req, res) {
    const token = req.headers.authorization.split(' ').pop()
    if (token != "null") {
        const tokenver = await TokenVerify(token)
        const admin = await userSchema.findById(tokenver._id)
        if (admin.isAdmin == true) {
            const ver = await homeSchema.findOne()
            if (ver == null) {
                const home = new homeSchema({
                    tituloh1: req.body.tituloh1,
                    texto1: req.body.texto1,
                    subtituloh2: req.body.subtituloh2,
                    texto2: req.body.texto2,
                    subtituloh3: req.body.subtituloh3,
                    texto3: req.body.texto3
                })
                await home.save()
            } else {
                await homeSchema.updateOne({ _id: ver._id }, {
                    $set: {
                        tituloh1: req.body.tituloh1,
                        texto1: req.body.texto1,
                        subtituloh2: req.body.subtituloh2,
                        texto2: req.body.texto2,
                        subtituloh3: req.body.subtituloh3,
                        texto3: req.body.texto3
                    }
                })
            }
            return res.status(200).send({ response: "Success", message: "Cambios guardados exitosamente" })
        } else {
            return res.status(200).send({ response: "Error", message: "Este es un usuario normal" })
        }
    } else {
        return res.status(200).send({ response: "Error", message: "Esta operacion requiere autenticacion" })
    }
}