const messageSchema = require('../../models/message')
const userSchema = require('../../models/user')

module.exports = async function (req, res) {
    const user = await userSchema.findOne({username: req.params.username})
    return messageSchema.find({emailUser: user.email})
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
}
