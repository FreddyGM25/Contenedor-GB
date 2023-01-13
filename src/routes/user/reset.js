const bcrypt = require('bcryptjs')
const userSchema = require('../../models/user')
const { TokenVerify } = require('../../middleware/autentication')

module.exports = async function (req, res) {
    const token = req.params.token.split(' ').pop()
    const tokenver = await TokenVerify(token)
    if (tokenver) {
        const user = await userSchema.findById(tokenver._id)
        const isPasswordMatched = await bcrypt.compare(user.password, req.body.passwordOld)
        if(isPasswordMatched) return res.status(200).send({response: "Error", message: "Contraseña antigua incorrecta"})
        if(req.body.passwordOld == req.body.passwordNew1) return res.status(200).send({response: "Error", message: "La contraseña anterior es igual a la nueva"})
        if (req.body.passwordNew1 == req.body.passwordNew2) {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(req.body.passwordNew1, salt);
            req.body.passwordNew1 = hashPassword;
            const result = await userSchema.updateOne({ _id: tokenver._id }, {
                $set: {
                    password: req.body.passwordNew1
                }
            })
            return res.status(200).send({ response: "Success", message: "Success" })
        }else{
            res.status(200).send({response: "Error", message: "La contraseña ingresada no coincide"})
        }
    }else{
        res.status(200).send({response: "Error", message: "Esta operacion necesita autenticacion"})
    }
}