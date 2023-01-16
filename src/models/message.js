const mongoose = require("mongoose")

const messageSchema = mongoose.Schema({
    
    emailUser:{
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
    },
    monto:{
        type:Number
    }
    
})

module.exports = mongoose.model('Message', messageSchema)