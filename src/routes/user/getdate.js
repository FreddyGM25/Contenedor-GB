const userSchema = require('../../models/user')
const { TokenVerify } = require('../../middleware/autentication')

module.exports = async function (req, res) {
  const token = req.headers.authorization.split(' ').pop()
  const tokenver = await TokenVerify(token)
  if (tokenver) {
    const result = await userSchema.findById(tokenver._id)
    return res.status(200).send({ response: "Success", date:result.dateF})
  } else {
    return res.status(200).send({ response: "Error", message: "Esta operacion requiere autenticacion" })
  }
}