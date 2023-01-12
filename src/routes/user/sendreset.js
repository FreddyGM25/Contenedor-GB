const userSchema = require('../../models/user')
const { TokenAssign } = require('../../middleware/autentication')
const { getTemplate, sendEmail } = require('../../middleware/email')

module.exports = async function (req, res) {
    const user = await userSchema.findOne({ email: req.body.email })
    if (user != null) {
        if(user.isActive == false) return res.status(400).send({ message: "The user is not active" })
        const token = await TokenAssign(user)
        const template = getTemplate(user.name, token, 2);
        const resp = await sendEmail(user.email, template, 2);
        if(resp == false) return res.status(502).send({message: "error to send email"})
        return res.status(502).send({message: "Success"})
    } else {
        return res.status(500).send({ message: "The user does't exist" })
    }

}
