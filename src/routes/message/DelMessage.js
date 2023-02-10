const messageSchema = require('../../models/message')
const { TokenVerify } = require('../../middleware/autentication')


module.exports = async function (req, res) {
  const token = await req.headers.authorization.split(' ').pop()
  const tokenver = await TokenVerify(token)
  if (tokenver) {
    await messageSchema.remove({ _id: req.params.id })
    return res.status(200).send({ response: "Success", message: 'Este mensaje ahora no es visible' })
  } else {
    return res.status(200).send({ response: "Error", error: "Se requiere autenticacion" })
  }
}