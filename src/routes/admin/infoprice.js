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
                const price = new infoSchema({
                    year: req.body.year,
                    month: req.body.month
                })
                price.save()
            } else {
                await infoSchema.updateOne({ _id: ver._id }, {
                    $set: {
                        year: req.body.year,
                        month: req.body.month
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