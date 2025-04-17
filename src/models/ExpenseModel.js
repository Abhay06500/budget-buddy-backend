const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const expenseSchema = new Schema({

    Category: {
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
    payment_method: {
        type: String,
        required: true
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:"user",
    },
    budgetId:{
        type:Schema.Types.ObjectId,
        ref:"budget"
    },
    imageURL:{
        type:String
    }

},
    {
        timestamps: true
    }
)

module.exports = mongoose.model('expense', expenseSchema)
