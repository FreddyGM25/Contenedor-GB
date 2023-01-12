const userSchema = require('../../models/user')
const { TokenVerify } = require('../../middleware/autentication')

module.exports = async function Authuser(req, res) {
    const token = req.query.token.split(' ').pop()
    const tokenver = await TokenVerify(token)
    if (tokenver) {
        const user = await userSchema.findById(tokenver._id)
        if (user.isActive == false) {
            const result = await userSchema.updateOne({ _id:  user._id}, {
                $set: {
                  isActive: true
                }
              })
            return res.status(200).send({ message: "Success", data: result })
        } else {
            return res.status(500).send({ message: "This account is active" })
        }

    } else {
        return { message: "this operation need autentication" }
    }
}