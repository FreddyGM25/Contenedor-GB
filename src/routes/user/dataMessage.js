const messageSchema = require('../../models/message')
const userSchema = require('../../models/user')

async function SeeM(id) {

        const message = await messageSchema.find({emailUser:id})
        if(message == null) return ""
        if(!message.isPro){
               const array = message.slice(0,10)
               return array
        }
        return message

}

module.exports = { SeeM }