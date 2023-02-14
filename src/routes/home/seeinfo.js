const userSchema = require('../../models/user')
const homeSchema = require('../../models/home')
const { TokenVerify } = require('../../middleware/autentication')

module.exports = async function (req, res) {
    const data = await homeSchema.findOne()
    return res.status(200).send({ response: "Success", data: data })
}