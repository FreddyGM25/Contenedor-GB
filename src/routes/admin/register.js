const bcrypt = require('bcryptjs')
const userSchema = require('../../models/user')

module.exports = async function (req, res) {
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(req.body.password, salt)
        req.body.password = hashPassword
        const user = new userSchema({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            isAdmin:true,
            createdAt: Date.now()
        });
        const result = await user.save()
        return res.status(200).send({response: "Success", message: "Success"})
}
