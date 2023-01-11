const bcrypt = require('bcryptjs')
const userSchema = require("../../models/user.js")
const { TokenAssign } = require('../../middleware/autentication')

module.exports = async function (req, res) {
    const password = req.body.password
    const userExist = await userSchema.findOne({ email: req.body.email })
    if (userExist && userExist.isAdmin == false) {
        const isPasswordMatched = await bcrypt.compare(password, userExist.password)
        if (isPasswordMatched) {
            if (userExist.isActive == false) {
                await userSchema.updateOne({ _id: tokenver._id }, {
                    $set: {
                        isActive: true
                    }
                })
                const token = await TokenAssign(userExist)
                res.cookie('token', token, { httpOnly: true });
                return res.status(200).send({ message: 'Success', name: userExist.name, token: token })
            } else {
                const token = await TokenAssign(userExist)
                res.cookie('token', token, { httpOnly: true });
                return res.status(200).send({ message: 'Success', name: userExist.name, token: token })
            }
        } return res.status(400).send({ message: "Password wrong" })
    } else {
        if (userExist && userExist.isAdmin == true) {
            const isPasswordMatched = await bcrypt.compare(password, userExist.password)
            if (isPasswordMatched) {
                const token = await TokenAssign(userExist)
                res.cookie('token', token, { httpOnly: true });
                return res.status(200).send({ message: 'Success', name: userExist.name, token: token, isAdmin: true })
            } return res.status(400).send({ message: "Password wrong" })
        }else{
            return res.status(400).send({ message: "Can't find user" })
        }
    }
}
