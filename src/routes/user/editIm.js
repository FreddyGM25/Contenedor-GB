const userSchema = require('../../models/user')
const { TokenVerify } = require('../../middleware/autentication')
const fs = require('fs').promises
require("dotenv").config()

module.exports = async function (req, res) {
    if(req.file.fileSize >= 100000000) return res.status(200).send({ response: "Error", message: "Esta imagen supera el limite del peso de la imagen" })
    const token = req.headers.authorization.split(' ').pop()
    const tokenver = await TokenVerify(token)
    if (tokenver) {
        const user = await userSchema.findById(tokenver._id)
        fs.unlink('./src/images/imagesprofile/' + user.imgpro.fileName)
        const result = await userSchema.updateOne({ _id: tokenver._id }, {
            $set: {
                imgpro: {
                    fileName: req.file.filename,
                    filePath: `${process.env.URLB}/imagesprofile/${req.file.filename}`,
                    fileType: req.file.mimetype,
                    fileSize: req.file.size
                }
            }
        })
        return res.status(200).send({response: "Success", message: "Cambios guardados"})
    } else {
        return res.status(200).send({ response: "Error", message: "Esta operacion requiere autenticacion" })
    }
}
