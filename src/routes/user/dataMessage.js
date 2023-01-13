const messageSchema = require('../../models/message')
const userSchema = require('../../models/user')

async function SeeM(id) {

        const message = await messageSchema.find({emailUser:id})
        if(message == null) return ""
        return message

}

module.exports = { SeeM }