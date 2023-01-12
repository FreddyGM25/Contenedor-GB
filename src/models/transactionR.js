const mongoose = require("mongoose")

const transactionSchema = mongoose.Schema({
    isPaypal:{
        type:Boolean,
        required:true
    },
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
    ncard:{
        type:Number,
        required: true,
    }
    
})

module.exports = mongoose.model('TransactionR', transactionSchema)