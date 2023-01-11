const mongoose = require("mongoose")

const messageSchema = mongoose.Schema({
    
    nameUser:{
        type:String,
        required: true
    },
    name:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    img: {
        fileName: {
            type: String,
        },
        filePath: {
            type: String,
        },
        fileType: {
            type: String,
        },
        fileSize: {
            type: String,
        }
    }
    
})

module.exports = mongoose.model('Message', messageSchema)