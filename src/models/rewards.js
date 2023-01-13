const mongoose = require("mongoose")
const number = require("mongoose/lib/cast/number")

const messageSchema = mongoose.Schema({

    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
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