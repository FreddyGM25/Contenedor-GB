const userSchema = require('../../models/user')
const { TokenVerify } = require('../../middleware/autentication')

module.exports = async function (req, res) {
    const token = req.headers.authorization.split(' ').pop()
    const tokenver = await TokenVerify(token)
    const admin = await userSchema.findById(tokenver._id)
    if (tokenver && admin.isAdmin == true) {
        const result = await userSchema.remove({ email: req.body.email })
        return res.status(500).send({message: "Success", data: result})
    } else {
        return { message: "this operation need autentication" }
    }
}
