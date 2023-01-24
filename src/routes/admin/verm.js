const userSchema = require('../../models/user')
const messageSchema = require('../../models/message')
const { TokenVerify } = require('../../middleware/autentication')

module.exports = async function (req, res) {
    const token = req.headers.authorization.split(' ').pop()
    if (token != "null") {
        const tokenver = await TokenVerify(token)
        const admin = await userSchema.findById(tokenver._id)
        if (admin.isAdmin == true) {
            let result = await messageSchema.find()
            result = result.filter((valorActual, indiceActual, arreglo) => {
                return arreglo.findIndex(valorDelArreglo => JSON.stringify(valorDelArreglo.email) === JSON.stringify(valorActual.email)) === indiceActual
            });
            return res.status(200).send({ response: "Success", message: result })
        } else {
            return res.status(200).send({ response: "Error", message: "Este es un usuario normal" })
        }
    } else {
        return res.status(200).send({ response: "Error", message: "Esta operacion requiere autenticacion" })
    }
}