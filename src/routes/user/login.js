const bcrypt = require('bcryptjs')
const userSchema = require("../../models/user.js")
const { TokenAssign } = require('../../middleware/autentication')

module.exports = async function (req, res) {
    const password = req.body.password
    const userExist = await userSchema.findOne({ email: req.body.email })
    if (userExist && userExist.isAdmin == false) {
        const isPasswordMatched = await bcrypt.compare(password, userExist.password)
        if (isPasswordMatched) {
            if (userExist.isActive == true) {
                const token = await TokenAssign(userExist)
                res.cookie('token', token, { httpOnly: true });
                return res.status(200).send({response: "Success", message: 'Inicio sesion', name: userExist.name, token: token })
            } else {
                return res.status(200).send({response: "Error", message: 'Active su cuenta primero, revise su correo electronico'})
            }
        } return res.status(200).send({ response: "Error", message: "Contraseña incorrecta" })
    } else {
        if (userExist && userExist.isAdmin == true) {
            const isPasswordMatched = await bcrypt.compare(password, userExist.password)
            if (isPasswordMatched) {
                const token = await TokenAssign(userExist)
                res.cookie('token', token, { httpOnly: true });
                return res.status(200).send({ message: 'Success', name: userExist.name, token: token, isAdmin: true })
            } return res.status(200).send({response: "Error", message: "Contraseña incorrecta" })
        }else{
            return res.status(200).send({response: "Error", message: "No se pudo encontrar el usuario" })
        }
    }
}
