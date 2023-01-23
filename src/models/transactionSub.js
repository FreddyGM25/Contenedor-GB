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
    namep:{
        type:String,
        required: true
    },
    statusTransaction:{
        type:String
    },
    idsub:{
        type:String,
        required:true
    },
    cancel:{
        type:Boolean,
        required:true
    }
    
})

module.exports = mongoose.model('TransactionSub', transactionSubSchema)