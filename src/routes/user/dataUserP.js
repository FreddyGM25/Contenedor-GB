const userSchema = require('../../models/user')
const { TokenVerify } = require('../../middleware/autentication')
const { SeeM } = require('./dataMessage')

module.exports = async function (req, res) {
    if (req.params.username) {
        const user = await userSchema.findOne({username:req.params.username.toLowerCase()})
        if(user == null) return res.status(501).send({ message: "The username no exist"})
        const message = await SeeM(user.username)
        return res.status(200).send({ user: user, message: message })
    }else{
        return res.status(500).send({ message: "Error username"})
    }


}