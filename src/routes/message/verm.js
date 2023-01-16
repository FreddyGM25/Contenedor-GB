const messageSchema = require('../../models/message')
const userSchema = require('../../models/user')

module.exports = async function (req, res) {
    const user = await userSchema.findOne({username: req.params.username})
    return messageSchema.find({emailUser: user.email})
        .then((data) => res.status(200).send({response: "Success", message: data}))
        .catch((error) => res.status(200).send({response: "Error", message: error}));
}
