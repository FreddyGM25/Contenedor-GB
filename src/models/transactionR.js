const mongoose = require("mongoose")

const transactionSchema = mongoose.Schema({

    name:{
        type:String
    },
    email:{
        type:String
    },
    monto:{
        type:Number,
        required: true
    },
    createdAt:{
        type: Date
    },
    statusTransaction:{
        type:String
    },
    emailUser:{
        type:String
    }
    
})

module.exports = mongoose.model('TransactionR', transactionSchema)