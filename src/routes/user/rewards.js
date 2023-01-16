const rewardSchema = require('../../models/reward')
const userSchema = require('../../models/user')
const { TokenVerify } = require('../../middleware/autentication')

module.exports = async function (req, res) {
  const token = req.headers.authorization.split(' ').pop()
  const tokenver = await TokenVerify(token)
  if (tokenver) {
    if(!req.file) return res.status(200).send({ response: "Error", message: "Falta adjuntar archivo" })
    const user = await userSchema.findById(tokenver._id)
    if(user.isPro == false) return res.status(200).send({ response: "Error", message: "Esta operacion es solo para usuarios PRO" })
    const reward = new rewardSchema({
        email: user.email,
        name: req.body.name,
        title: req.body.title,
        file: {
            fileName: req.file.filename,
            filePath: `${process.env.URLB}/file/${req.file.filename}`,
            fileType: req.file.mimetype,
            fileSize: req.file.size
        }
    })
    await reward.save()
    return res.status(200).send({ response: "Success", message: "Regalo subido correctamente"})
  } else {
    return res.status(200).send({ response: "Error", message: "Esta operacion requiere autenticacion" })
  }
}
