const userSchema = require('../models/user')

async function Authuser(username) {
    const user = await userSchema.findOne({username: username})
    if(user != null){
        return false
    }
    return true
}
module.exports = { Authuser }