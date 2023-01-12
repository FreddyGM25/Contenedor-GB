const mongoose = require("mongoose")

const transactionSubSchema = mongoose.Schema({
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
        type:Number,
        required: true,
    },
    fechaexp:{
        type:Date,
        required:true
    },
    ncvv:{
        type:Number,
        required:true,
    },
    statusTransaction:{
        type:String
    },
    typeSub:{
        type:Number
    }
    
})

module.exports = mongoose.model('TransactionSub', transactionSubSchema)