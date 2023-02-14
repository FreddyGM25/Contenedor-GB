const userSchema = require('../../models/user')
const homeSchema = require('../../models/home')
const { TokenVerify } = require('../../middleware/autentication')
const fs = require('fs').promises

module.exports = async function (req, res) {
    const token = req.headers.authorization.split(' ').pop()
    if (token != "null") {
        const tokenver = await TokenVerify(token)
        const admin = await userSchema.findById(tokenver._id)
        if (admin.isAdmin == true) {
            const ver = await homeSchema.findOne()
            if (ver == null) {
                const home = new homeSchema({
                    image: {
                        fileName: req.file.filename,
                        filePath: `${process.env.URLB}/homeimg/${req.file.filename}`,
                        fileType: req.file.mimetype,
                        fileSize: req.file.size
                    },
                })
                await home.save()
            } else {
                fs.unlink('./src/images/home/' + ver.image.fileName)
                await homeSchema.updateOne({ _id: ver._id }, {
                    $set: {
                        image: {
                            fileName: req.file.filename,
                            filePath: `${process.env.URLB}/homeimg/${req.file.filename}`,
                            fileType: req.file.mimetype,
                            fileSize: req.file.size
                        }
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