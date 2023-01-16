const bcrypt = require('bcryptjs')
const userSchema = require('../../models/user')
const { TokenVerify } = require('../../middleware/autentication')

module.exports = async function (req, res) {
    const token = req.query.token.split(' ').pop()
    const tokenver = await TokenVerify(token)
    if (tokenver) {
        if (req.body.password == req.body.password2) {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(req.body.password, salt);
            req.body.password = hashPassword;
            const result = await userSchema.updateOne({ _id: tokenver._id }, {
                $set: {
                    password: req.body.password
                }
            })
            return res.status(200).send({ response: "Success", message: "Contraseña cambiada correctamente" })
        }else{
            res.status(200).send({response: "Error", message: "Las contraseñas no coinciden"})
        }
    }else{
        res.status(200).send({response: "Error", message: "Esta operacion necesita autenticacion"})
    }
}