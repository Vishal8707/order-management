const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId


const orderSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
        ref: 'user',
        required: true
    },
    phone: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    sub_total: {
        type: Number,
        required: true,
    },
   
},{timestamps:true})

module.exports= mongoose.model("order", orderSchema)