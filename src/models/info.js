const mongoose = require("mongoose")

const infoSchema = mongoose.Schema({

    year: {
        type: Number
    },
    month: {
        type: Number
    },
    acerca: {
        type: String
    },
    aviso: {
        type: String
    },
    reglas: {
        type: String
    },
    comisiones: {
        type: String
    }

})

module.exports = mongoose.model('Info', infoSchema)