const bcrypt = require('bcryptjs')
const userSchema = require('../../models/user')
const { TokenVerify } = require('../../middleware/autentication')

module.exports = async function (req, res) {
    const token = req.params.token.split(' ').pop()
    const tokenver = await TokenVerify(token)
    if (tokenver) {
        if (req.body.password == req.body.password2) {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(req.body.password, salt);
            req.body.password = hashPassword;
            const result = await userSchema.updateOne({ _id: tokenver._id }, {
                $set: {
                    password: req.body.password
                }
            })
            return res.status(200).send({ message: "Success", data: result })
        }else{
            res.status(400).send({message: "Passwords do not match"})
        }
    }else{
        res.status(500).send({message: "this operation need autentication"})
    }
}