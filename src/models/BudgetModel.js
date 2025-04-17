const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const budgetSchema = new Schema({

    Category: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    description:{
        type:String,
        required:true
    },
    period:{
        type:Date,
        required:true
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:"user",
    }

},
    {
        timestamps: true
    })
    module.exports = mongoose.model('Budget',budgetSchema)