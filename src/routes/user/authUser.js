const userSchema = require('../../models/user')

module.exports = async function Authuser(req, res) {
    const username = req.body.username
    const user = await userSchema.findOne({username: username})
    if(user != null){
        return res.status(200).send({response: "Error", message: "Este nombre de usuario ya existe"})
    }
    return res.status(200).send({response: "Success", message: "Este nombre esta disponible"})
}