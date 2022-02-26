const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
    {
        username: { 
            type: String,
            required: "Missing username",
            unique: true,
         },
        password: {
            type: String,
            required: "Missing password",
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            unique: true,
            required: "Missing Email address",
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "Please fill a valid email address",
            ],
        },
        firstName: {
            type: String,
            // https://stackoverflow.com/questions/28116533/how-can-i-capitalize-strings-in-mongoose
        },
        lastName: {
            type: String,
        },
    },
)

module.exports = mongoose.model("User", UserSchema);