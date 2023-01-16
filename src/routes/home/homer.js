const userSchema = require('../../models/user')
const { TokenVerify } = require('../../middleware/autentication')

module.exports = async function (req, res) {

    const user = await userSchema.find()
    let arrayUser = []
    let cont = 0
    let contu = user.length - 1
    if (user.length < 8) {
        for (var i = 0; i < user.length; i++) {
            if (user[contu].isAdmin) {
                contu--
                i++
            }
            arrayUser[cont] = new userSchema({
                name: user[contu].name,
                titulo: user[contu].titulo,
                username: user[contu].username,
                imgpro: {
                    filePath: user[contu].imgpro.filePath
                },
            })
            contu--
            cont++
        }
    } else {
        for (var i = 0; i < 8; i++) {
            if (user[contu].isAdmin) {
                contu--
            }
            arrayUser[cont] = new userSchema({
                name: user[contu].name,
                titulo: user[contu].titulo,
                username: user[contu].username,
                imgpro: {
                    filePath: user[contu].imgpro.filePath
                },
            })
            contu--
            cont++
        }
    }
    return res.status(200).send({response: "Success", data: arrayUser })
}