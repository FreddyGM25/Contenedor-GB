const bcrypt = require('bcryptjs')
const userSchema = require('../../models/user')
const { TokenAssign } = require('../../middleware/autentication')
const { Authuser } = require('../../middleware/authUser')

module.exports = async function (req, res) {
    if (req.file) {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashPassword;
        const usn = (req.body.username).toLowerCase().replace(/\s+/g, '')
        const ver = await userSchema.findOne({ email: req.body.email })
        if (ver == null) {
            const ver2 = await Authuser(usn)
            if(ver2 == false) return res.status(500).send({message: "This username exist"})
            const user = new userSchema({
                name: req.body.name,
                username: usn,
                email: req.body.email,
                password: req.body.password,
                imgpro: {
                    fileName: req.file.originalname,
                    filePath: req.file.path,
                    fileType: req.file.mimetype,
                    fileSize: req.file.size
                },
                accountStatus: false,
                money: 0.0,
                isPro: false,
                isAdmin: false
            });
            const result = await user.save()
            const token = await TokenAssign(user)
            res.cookie('token', token, { httpOnly: true });
            return res.status(200).send({ message: "Success", token: token, data: result })
        } else {
            return res.status(500).send({ message: "Error image is required" })
        }
    } else {
        return res.status(500).send({ message: "Image required" })
    }

}
