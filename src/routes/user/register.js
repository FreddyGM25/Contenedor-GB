const bcrypt = require('bcryptjs')
const userSchema = require('../../models/user')
const { TokenAssign } = require('../../middleware/autentication')
const { getTemplate, sendEmail } = require('../../middleware/email')

module.exports = async function (req, res) {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashPassword;
    const usn = await userSchema.findOne({ username: req.body.username })
    if (usn == null) {
        const ver = await userSchema.findOne({ email: req.body.email })
        if (ver == null) {
            const user = new userSchema({
                name: req.body.name,
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                accountStatus: false,
                money: 0.0,
                isPro: false,
                isAdmin: false,
                isActive: false,
                createdAt: Date.now(),
                imgpro: {
                    fileName: "defaultimage.png",
                    filePath: `${process.env.URLB}/serverimg/defaultimage.png`,
                    fileType: "image/png"
                },
                description:"",
                tiktok:"",
                facebook:"",
                instagram:"",
                titulo:"",
                profesion:""

            });
            await user.save()
            const token = await TokenAssign(user)
            const template = getTemplate(user.name, token, "", "", 1);
            const resp = await sendEmail(user.email, template, 1, "");
            if (resp == false) return res.status(200).send({ response: "Error", message: "Error al enviar el email" })
            res.cookie('token', token, { httpOnly: true });
            return res.status(200).send({ response: "Success", message: "Usuario creado correctamente" })
        } else {
            return res.status(200).send({ response: "Error", message: "El usuario ya existe" })
        }
    }else{
        return res.status(200).send({response: "Error", message: "El usuario ya existe" })
    }

}
