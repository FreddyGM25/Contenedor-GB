const messageSchema = require('../../models/message')

module.exports = async function (req, res) {
    return messageSchema.find({username:req.params.username})
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
}
