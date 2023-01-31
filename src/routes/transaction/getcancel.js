const userSchema = require('../../models/user')
const transactionSchema = require('../../models/transactionSub')
const { TokenVerify } = require('../../middleware/autentication')
const { SeeM } = require('../user/dataMessage')

module.exports = async function (req, res) {
    const token = await req.headers.authorization.split(' ').pop()
    const tokenver = await TokenVerify(token)
    if (tokenver) {
        const user = await userSchema.findById(tokenver._id)
        const transaction = await transactionSchema.findOne({email: user.email, cancel:false})
        if(transaction == null) return res.status(200).send({response: "Success", cancel:transaction.cancel })
        return res.status(200).send({response: "Success", cancel:transaction.cancel })
    }else{
        return res.status(200).send({response: "Error", error: "Se requiere autenticacion"})
    }

}