const messageSchema = require('../../models/message')

module.exports = async function (req, res) {
    if(req.file){
        const message = new messageSchema({
            nameUser: req.query.username,
            name: req.body.name,
            title: req.body.title,
            description: req.body.description,
            email: req.body.email,
            img: {
                fileName: req.file.originalname,
                filePath: req.file.path,
                fileType: req.file.mimetype,
                fileSize: req.file.size
            }
        })
        const result = await message.save()
        return res.status(200).send({message: "Success", data: result})
    }else{
        const message = new messageSchema({
            nameUser: req.query.username,
            name: req.body.name,
            title: req.body.title,
            description: req.body.description,
            email: req.body.email
        })
        const result = await message.save()
        return res.status(200).send({message: "Success", data: result})
    }
}
