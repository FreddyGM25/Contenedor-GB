const messageSchema = require('../../models/message')
const userSchema = require('../../models/user')

async function SeeM(id) {

        const message = await messageSchema.find({ emailUser: id, visible:true})
        const user = await userSchema.findOne({ email: id })
        if (message == null) return ""
        if (user.isPro == false) {
                const array = message.slice(0, 10)
                return array
        }
        return message

}

async function SeeMP(id) {

        const message = await messageSchema.find({ emailUser: id})
        const user = await userSchema.findOne({ email: id })
        if (message == null) return ""
        if (user.isPro == false) {
                const array = message.slice(0, 10)
                return array
        }
        return message

}

module.exports = { SeeM, SeeMP }