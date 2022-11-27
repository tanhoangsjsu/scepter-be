const mongoose = require("mongoose")

const requestSchema = new mongoose.Schema({
    username:{
        type:String,
        require: true,
        minlength:6,
        maxlength:20,
    },
    pickupAddress:{
        type:String,
        require: true,
        minlength:10,
        maxlength:50,
    },
    dropAddress:{
        type:String,
        require: true,
        minlength:10,
        maxLength:50,
    },
    status:{
        type:String,
        require: true,
    },
    acceptor:{ 
        type:String,
        require: true,
        minlength:6,
        maxlength:20,
    }
},{timestamps: true})

module.exports = mongoose.model("request", requestSchema)
