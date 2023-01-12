const userSchema = require('../../models/user')
const transactionSchema = require('../../models/transactionSub')
const { TokenVerify } = require('../../middleware/autentication')
const { addDays } = require('../../middleware/adddays')

module.exports = async function (req, res) {
    const token = req.headers.authorization.split(' ').pop()
    const tokenver = await TokenVerify(token)
    const user = await userSchema.findOne({ email: req.body.email })
    if (tokenver) {
        const transaction = await transactionSchema.findOne({ email: user.email })
        const date = new Date(Date.now())
        if (transaction.statusTransaction == "Complete" && transaction.typeSub == 1) {
            const newdate = addDays(365)
            const result = await userSchema.updateOne({ _id: user._id }, {
                $set: {
                    isPro: true,
                    dateB: date,
                    dateF: newdate
                }
            })
            return res.status(200).send(result)
        }
        if (transaction.statusTransaction == "Complete" && transaction.typeSub == 2) {
            const newdate = addDays(30)
            const result = await userSchema.updateOne({ _id: user._id }, {
                $set: {
                    isPro: true,
                    dateB: date,
                    dateF: newdate
                }
            })
            return res.status(200).send(result)
        }
        return res.status(500).send({ message: "Transaction not complete" })
    } else {
        return { message: "this operation need autentication" }
    }
}
