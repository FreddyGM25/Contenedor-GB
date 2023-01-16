const rewardSchema = require('../../models/reward')

module.exports = async function (req, res) {

    return rewardSchema.find()
        .then((data) => res.status(200).send({response: "Success", message: data}))
        .catch((error) =>  res.status(200).send({ response: "Error", message: error }));

}
