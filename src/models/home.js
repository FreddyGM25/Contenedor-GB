const mongoose = require("mongoose")

const HomeSchema = mongoose.Schema({

    tituloh1: {
        type: String
    },
    texto1: {
        type: String
    },
    subtituloh2: {
        type: String
    },
    texto2: {
        type: String
    },
    subtituloh3: {
        type: String
    },
    texto3: {
        type: String
    },
    image: {
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
    URL:{
        type:String
    }
})

module.exports = mongoose.model('Home', HomeSchema)