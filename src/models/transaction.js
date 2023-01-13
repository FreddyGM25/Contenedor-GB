const mongoose = require("mongoose")

const transactionSchema = mongoose.Schema({
    emailUser:{
        type:String,
        required:true
    },
    isPaypal:{
        type:Boolean
    },
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    monto:{
        type:Number,
        required: true
    },
    statusTransaction:{
        type:String
    }
    
})

module.exports = mongoose.model('Transaction', transactionSchema)