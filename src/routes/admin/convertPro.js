const userSchema = require('../../models/user')
const { TokenVerify } = require('../../middleware/autentication')
const { addDays } = require('../../middleware/adddays')

module.exports = async function (req, res) {
    const token = req.headers.authorization.split(' ').pop()
    const tokenver = await TokenVerify(token)
    const user = await userSchema.findOne({ email: req.body.email })
    if(user.isPro == true) return res.status(200).send({ response: "Error", message: "Este usuario ya es PRO" })
    if (tokenver) {
        await userSchema.findOne({ email: user.email })
        const date = new Date(Date.now())
        const newdate = addDays(31)
        await userSchema.updateOne({ _id: user._id }, {
            $set: {
                isPro: true,
                dateB: date,
                dateF: newdate
            }
        })
        return res.status(200).send({ response: "Success", message: "Success" })
    } else {
        return res.status(200).send({ response: "Error", message: "this operation need autentication" })
    }
}
