const infoSchema = require('../../models/info')

module.exports = async function (req, res) {

    return infoSchema.find({})
        .then((data) => res.status(200).send({ response: "Success", datainfo: data }))
        .catch((error) => res.status(200).send({ response: "Error", message: error }));

}