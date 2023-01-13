const userSchema = require('../../models/user')
const transactionSchema = require('../../models/transactionR')
const { TokenVerify } = require('../../middleware/autentication')

module.exports = async function (req, res) {
    const token = req.headers.authorization.split(' ').pop()
    const tokenver = await TokenVerify(token)
    if (tokenver) {
        const user = await userSchema.findById(tokenver._id)
        if (user.money < req.body.money) return res.status(501).send({ message: "Error monto insuficiente" })
        const transaction = new transactionSchema({
            name: user.name,
            email: req.body.email,
            monto: req.body.monto
        })
        const result = await transaction.save()
        await userSchema.updateOne({ _id: user._id }, {
            $set: {
                money: user.money - req.body.money
            }
        })
        return res.status(200).send({ message: "Success", data: result })
    } else {
        return { message: "this operation need autentication" }
    }
}
