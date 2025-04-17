const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const incomeSchema = new Schema({

    source: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    period: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:"user",
    },
  
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model('income', incomeSchema)
