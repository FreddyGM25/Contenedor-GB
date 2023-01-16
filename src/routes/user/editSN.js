const userSchema = require('../../models/user')
const { TokenVerify } = require('../../middleware/autentication')

module.exports = async function (req, res) {
  const token = req.headers.authorization.split(' ').pop()
  const tokenver = await TokenVerify(token)
  if (tokenver) {
    const result = await userSchema.updateOne({ _id: tokenver._id }, {
      $set: {
        tiktok: req.body.tiktok,
        facebook: req.body.facebook,
        instagram: req.body.instagram,
      }
    })
    return res.status(200).send({ response: "Success", message: "Cambios guardados"})
  } else {
    return res.status(200).send({ response: "Error", message: "Esta operacion requiere autenticacion" })
  }
}
