const userSchema = require('../../models/user')
const { TokenVerify } = require('../../middleware/autentication')
const bcrypt = require('bcryptjs')

module.exports = async function (req, res) {
    const token = req.headers.authorization.split(' ').pop()
    const tokenver = await TokenVerify(token)
    const user = await userSchema.findById(tokenver._id)
    if (tokenver) {
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(req.body.password, salt)
        req.body.password = hashPassword
        const result = await userSchema.updateOne({ _id:  idt}, {
            $set: {
              password: req.body.password
            }
          })
        return res.status(500).send({message: "Success", data: result})
    } else {
        return { message: "this operation need autentication" }
    }
}
