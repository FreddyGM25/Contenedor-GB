const userSchema = require('../../models/user')
const { TokenVerify } = require('../../middleware/autentication')

module.exports = async function (req, res) {
    const token = req.headers.authorization.split(' ').pop()
    const tokenver = await TokenVerify(token)
    if (tokenver) {
        const admin = await userSchema.findById(tokenver._id)
        if (admin.isAdmin == true) {
            const result = await userSchema.remove({ email: req.params.email })
            return res.status(200).send({ message: "Success", data: result })
        } else {
            return res.status(400).send({ message: "This is normal user" })
        }

    } else {
        return res.status(500).send({ message: "this operation need autentication" })
    }
}