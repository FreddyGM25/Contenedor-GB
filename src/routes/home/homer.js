const userSchema = require('../../models/user')
const messageSchema = require('../../models/message')

module.exports = async function (req, res) {

    const user = await userSchema.find()
    let arrayUser = []
    let numUser = []
    let cont = 0
    let contu = user.length - 1
    if (user.length <= 10) {
        for (var i = 0; i < user.length; i++) {
            if (user[contu].isAdmin) {
                contu--
                i++
            }
            const num = await messageSchema.find({emailUser: user[contu].email})
            arrayUser[cont] = new userSchema({
                name: user[contu].name,
                titulo: user[contu].titulo,
                username: user[contu].username,
                imgpro: {
                    filePath: user[contu].imgpro.filePath
                },
            })
            numUser[cont] = num.length
            contu--
            cont++
        }
    } else {
        for (var i = 0; i < 10; i++) {
            if (user[contu].isAdmin) {
                contu--
            }
            let num = await messageSchema.find({emailUser: user[contu].email})
            arrayUser[cont] = new userSchema({
                name: user[contu].name,
                titulo: user[contu].titulo,
                profesion: user[contu].profesion,
                username: user[contu].username,
                imgpro: {
                    filePath: user[contu].imgpro.filePath
                },
            })
            numUser[cont] = num.length
            contu--
            cont++
        }
    }
    return res.status(200).send({response: "Success", data: arrayUser, datam:numUser})
}