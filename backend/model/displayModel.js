const mongoose = require("mongoose");

const displaySchema = mongoose.Schema(
    {
        displayId:{
            type: String,
            required: true,
            unique: true
        },
       displayDate:{
            type: Date,
            required: [true, "Please add Date"]
        },
    }
);

const Display = mongoose.model("Display", displaySchema);

module.exports = Display;