const userSchema = require('../../models/user')
const transactionRSchema = require('../../models/transactionR')
const { TokenVerify } = require('../../middleware/autentication')

module.exports = async function (req, res) {
    const token = req.headers.authorization.split(' ').pop()
    const tokenver = await TokenVerify(token)
    if (tokenver) {
        const admin = await userSchema.findById(tokenver._id)
        if(admin.isAdmin == true) {
            return transactionRSchema.find()
            .then((data) => res.json(data))
            .catch((error) => res.json({ message: error }));
        }else{
            return res.status(500).send({message: "This is normal user"})
        }  
    } else {
        return { message: "this operation need autentication" }
    }
}