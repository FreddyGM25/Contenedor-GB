const userSchema = require('../../models/user')
const { TokenVerify } = require('../../middleware/autentication')

module.exports = async function (req, res) {
    const token = req.headers.authorization.split(' ').pop()
    const tokenver = await TokenVerify(token)
    const admin = await userSchema.findById(tokenver._id)
    if (tokenver && admin.isAdmin == true) {
            return userSchema.find()
            .then((data) => res.json(data))
            .catch((error) => res.json({ message: error }));
    } else {
        return { message: "this operation need autentication" }
    }
}
