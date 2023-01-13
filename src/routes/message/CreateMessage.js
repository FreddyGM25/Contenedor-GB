const messageSchema = require('../../models/message')
const userSchema = require('../../models/user')

module.exports = async function (req, res) {
    if(!req.body.username) return res.status(200).send({response: "Error", message: "Error, se necesita el nombre de usuario"})
    if(!req.body.name) return res.status(200).send({response: "Error", message: "Error, se necesita el nombre"})
    if(!req.body.title) return res.status(200).send({response: "Error", message: "Error, se necesita el titulo"})
    if(!req.body.description) return res.status(200).send({response: "Error", message: "Error, se necesita la descripcion"})
    if(!req.body.email) return res.status(200).send({response: "Error", message: "Error, se necesita el email"})
    const user = await userSchema.findOne({username: req.body.username})
    if(req.file){
        const message = new messageSchema({
            emailUser: user.email,
            name: req.body.name,
            title: req.body.title,
            description: req.body.description,
            email: req.body.email,
            img: {
                fileName: req.file.originalname,
                filePath: `http://25.78.142.190:9000/images/${req.file.filename}`,
                fileType: req.file.mimetype,
                fileSize: req.file.size
            },
            monto: ""
        })
        const result = await message.save()
        return res.status(200).send({response: "Success", message: "Success"})
    }else{
        const message = new messageSchema({
            emailUser: req.body.username,
            name: req.body.name,
            title: req.body.title,
            description: req.body.description,
            email: req.body.email,
            monto:""
        })
        const result = await message.save()
        return res.status(200).send({response: "Success", message: "Success"})
    }
}
