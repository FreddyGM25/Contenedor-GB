const userSchema = require('../../models/user')
const transactionSchema = require('../../models/transactionR')
const { TokenVerify } = require('../../middleware/autentication')

module.exports = async function (req, res) {
    const token = req.headers.authorization.split(' ').pop()
    const tokenver = await TokenVerify(token)
    if (tokenver) {
        const user = await userSchema.findById(tokenver._id)
        const isPaypal = req.body.isPaypal
        if (isPaypal == "false") {
            const transaction = new transactionSchema({
                name: user.name,
                email: user.email,
                monto: req.body.monto,
                ncard: req.body.ncard,
                isPaypal: false
            })
            const result = await transaction.save()
            await userSchema.updateOne({ _id: user._id }, {
                $set: {
                    monto: user.monto - req.body.monto
                }
            })
            return res.status(200).send({ message: "Success", data: result })
        }
        if (isPaypal == "true") {
            const transaction = new transactionSchema({
                name: user.name,
                email: user.email,
                monto: req.body.monto,
                ncard: req.body.ncard,
                isPaypal: true
            })
            const result = await transaction.save()
            await userSchema.updateOne({ _id: user._id }, {
                $set: {
                    monto: user.monto - req.body.monto
                }
            })
            return res.status(200).send({ message: "Success", data: result })
        }
        return res.status(500).send({ message: "Error request" })
    } else {
        return { message: "this operation need autentication" }
    }
}
