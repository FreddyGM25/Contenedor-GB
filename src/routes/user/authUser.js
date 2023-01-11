const userSchema = require('../../models/user')

module.exports = async function Authuser(req, res) {
    const username = (req.body.username).toLowerCase()
    const user = await userSchema.findOne({username: username})
    if(user != null){
        return res.status(500).send({message: "this username exist"})
    }
    return res.status(200).send({message: "username available"})
}