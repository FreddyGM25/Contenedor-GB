const messageSchema = require('../../models/message')
const { TokenVerify } = require('../../middleware/autentication')

module.exports = async function (req, res) {
    const token = req.headers.authorization.split(' ').pop()
    const tokenver = await TokenVerify(token)
    if (tokenver) {
        const message = await messageSchema.findById(req.params.id)
        return res.status(200).send({ message: message })
    } else {
        return res.status(500).send({ message: "this operation need autentication" })
    }
}
