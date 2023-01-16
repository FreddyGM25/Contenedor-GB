const userSchema = require('../../models/user')
const infoSchema = require('../../models/info')
const { TokenVerify } = require('../../middleware/autentication')

module.exports = async function (req, res) {
    const token = req.headers.authorization.split(' ').pop()
    if (token != "null") {
        const tokenver = await TokenVerify(token)
        const admin = await userSchema.findById(tokenver._id)
        if (admin.isAdmin == true) {
            const ver = await infoSchema.findOne()
            if (ver == null) {
                const info = new infoSchema({
                    acerca: req.body.acerca,
                    aviso: req.body.aviso,
                    reglas: req.body.reglas,
                    comisiones: req.body.comisiones
                })
                info.save()
            } else {
                await infoSchema.updateOne({ _id: ver._id }, {
                    $set: {
                        acerca: req.body.acerca,
                        aviso: req.body.aviso,
                        reglas: req.body.reglas,
                        comision: req.body.comision
                    }
                })
            }
            return res.status(200).send({ response: "Success", message: "Success" })
        } else {
            return res.status(200).send({ response: "Error", message: "Este es un usuario normal" })
        }
    } else {
        return res.status(200).send({ response: "Error", message: "Esta operacion requiere autenticacion" })
    }
}