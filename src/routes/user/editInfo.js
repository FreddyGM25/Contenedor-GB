const userSchema = require('../../models/user')
const { TokenVerify } = require('../../middleware/autentication')

module.exports = async function (req, res) {
  const token = req.headers.authorization.split(' ').pop()
  const tokenver = await TokenVerify(token)
  if (tokenver) {
    if (req.body.username && req.body.name && req.body.profesion && req.body.titulo && req.body.description) {
      const ver = await userSchema.findOne({ username: req.body.username })
      if (ver != null) {
        if (ver.username != req.body.username) return res.status(200).send({ response: "Error", message: "Este nombre usuario existe" })
      }
      const result = await userSchema.updateOne({ _id: tokenver._id }, {
        $set: {
          username: req.body.username,
          name: req.body.name,
          profesion: req.body.profesion,
          titulo: req.body.titulo,
          description: req.body.description
        }
      })
      return res.status(200).send({ response: "Success", message: "Success" })
    }
    return res.status(200).send({ response: "Error", message: "Se requiere todos los campos" })
  } else {
    return res.status(200).send({ response: "Error", message: "Esta operacion require autenticacion" })
  }
}
