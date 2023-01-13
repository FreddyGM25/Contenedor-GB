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
    }
    
})

module.exports = mongoose.model('TransactionR', transactionSchema)