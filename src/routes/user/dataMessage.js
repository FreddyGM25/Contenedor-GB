const messageSchema = require('../../models/message')
const userSchema = require('../../models/user')
const { TokenVerify } = require('../../middleware/autentication')

async function SeeM(id) {

        const message = await messageSchema.find({nameUser:id})
        if(message == null) return ""
        return message

}

module.exports = { SeeM }