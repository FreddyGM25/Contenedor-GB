const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: [8, 'Password should be minimum of 8 characters']
    },
    imgpro: {
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
    isActive: {
        type: Boolean
    },
    money: {
        type: Number
    },
    isPro: {
        type: Boolean
    },
    isAdmin:{
        type:Boolean
    },
    dateB: {
        type: Date
    }
    ,
    dateF: {
        type: Date
    }
})

module.exports = mongoose.model('User', userSchema)