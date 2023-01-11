const userSchema = require('../../models/user')
const transactionSchema = require('../../models/transactionSub')
const { TokenVerify } = require('../../middleware/autentication')

module.exports = async function (req, res) {
    const token = req.headers.authorization.split(' ').pop()
    const tokenver = await TokenVerify(token)
    const user = await userSchema.findById(tokenver._id)

    if (tokenver) {
        const statusSub = req.body.statusSub
        const isPaypal = req.body.isPaypal
        if (statusSub == "1" &&  isPaypal == "false") {
            const transaction = new transactionSchema({
                name: user.name,
                email: user.email,
                monto: 99.99,
                ncard: req.body.ncard,
                fechaexp: req.body.fechaexp,
                ncvv: req.body.ncvv,
                statusTransaction: "Pending",
                typeSub: 1,
                isPaypal: false
            })
            const result = await transaction.save()
            return res.status(200).send({ message: "Success", Status: "Pending", data: result })
        }
        if (statusSub == "2" &&  isPaypal == "false") {
            const transaction = new transactionSchema({
                name: user.name,
                email: user.email,
                monto: 10,
                ncard: req.body.ncard,
                fechaexp: req.body.fechaexp,
                ncvv: req.body.ncvv,
                statusTransaction: "Pending",
                typeSub: 2,
                isPaypal: false
            })
            const result = await transaction.save()
            return res.status(200).send({ message: "Success", Status: "Pending", data: result })
        }
        if (statusSub == "1" &&  isPaypal == "true") {
            const transaction = new transactionSchema({
                name: user.name,
                email: user.email,
                monto: 99.99,
                statusTransaction: "Pending",
                typeSub: 2,
                isPaypal:true
            })
            const result = await transaction.save()
            return res.status(200).send({ message: "Success", Status: "Pending", data: result })
        }
        if (statusSub == "2" &&  isPaypal == "true") {
            const transaction = new transactionSchema({
                name: user.name,
                email: user.email,
                monto: 99.99,
                statusTransaction: "Pending",
                typeSub: 2,
                isPaypal:true
            })
            const result = await transaction.save()
            return res.status(200).send({ message: "Success", Status: "Pending", data: result })
        }
        return res.status(500).send({message: "Error request"})
    } else {
        return { message: "this operation need autentication" }
    }
}
