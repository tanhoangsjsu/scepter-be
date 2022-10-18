const mongoose = require('mongoose');
const { isEmail } = require("validator");
var uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema(
    {
    username: {
        type: String,
        required: [true, "Required"],
        minlength: [6, "Must be at least 6 characters"],
        maxlength: [20, "Must be less than 20 characters"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Required"],
        maxlength: [50, "Must be 50 characters or less"],
        unique: true,
        validate: [isEmail, "Please enter a valid email"],

    },
    password: {
        type: String,
        required: [true, "Required"],
        select: false,
        minlength: [8, "Must be 8 characters or more"],
    },
    role:{
        type:String,
    },
    isAssistance: {
        type: Boolean,
        default: false,
    },
    },
    { timestamps: true }
    );
    userSchema.plugin(uniqueValidator, {
        message: "Error, expected {PATH} to be unique",
    });

module.exports = mongoose.model("User", userSchema);