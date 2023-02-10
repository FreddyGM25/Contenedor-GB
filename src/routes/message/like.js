const messageSchema = require('../../models/message')
const { TokenVerify } = require('../../middleware/autentication')


module.exports = async function (req, res) {
    const token = await req.headers.authorization.split(' ').pop()
    const tokenver = await TokenVerify(token)
    if (tokenver) {
        const result = await messageSchema.findById(req.params.id)
        const like = result.like
        await messageSchema.updateOne({ _id: req.params.id }, {
            $set: {
              like: !like
            }
          })
        return res.status(200).send({response: "Success", message: 'Se actualizo el destacado' })
    }else{
        return res.status(200).send({response: "Error", error: "Se requiere autenticacion"})
    }
}