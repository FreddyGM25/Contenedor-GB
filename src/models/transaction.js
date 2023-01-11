const mongoose = require("mongoose")

const transactionSchema = mongoose.Schema({
    nameUser:{
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
    ncard:{
        type:Number
    },
    fechaexp:{
        type:Date
    },
    ncvv:{
        type:Number
    },
    statusTransaction:{
        type:String
    }
    
})

module.exports = mongoose.model('Transaction', transactionSchema)