const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchma = Schema({
    firstname: {
        type: String,
        required: [true, "firstname is required"],
        minlenght: [3, "Must be at least 3 characters"],
        maxlenght: [30, "must have at most 30 characters"],
    },
    lastname: {
        type: String,
        required: [true, "lastname is required"],
        minlenght: [3, "Must be at least 3 characters"],
        maxlenght: [30, "must have at most 30 characters"],
    },
    age: {
        type: Number,
        required: [true, 'user age must be provided'],
    },

}, {
    timestamps: true,
});
const User = mongoose.model("users", userSchma);

module.exports = User;