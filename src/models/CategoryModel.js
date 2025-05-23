const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({

    name:{
        type: String,
        required: true,
        
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:"user",
    }
},{
    timestamps: true
})
module.exports = mongoose.model('category', categorySchema);