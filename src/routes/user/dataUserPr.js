const userSchema = require('../../models/user')
const { TokenVerify } = require('../../middleware/autentication')
const { SeeM } = require('./dataMessage')

module.exports = async function (req, res) {
    const token = req.headers.authorization.split(' ').pop()
    const tokenver = await TokenVerify(token)
    if (tokenver) {
        const user = await userSchema.findById(tokenver._id)
        if(user == null) return res.status(501).send({ message: "The username no exist"})
        const message = await SeeM(user.username)
        return res.status(200).send({ user: user, message: message })
    }else{
        return res.status(500).send({ message: "Error username"})
    }

}