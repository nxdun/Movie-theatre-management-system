const mongoose = require("mongoose");

const screenSchema = mongoose.Schema(
    {
        screenname:{
            type: String,
            required: [true, "Please add a Screen Name"]
        },
       location:{
            type: String,
            required: [true, "Please add a Location"]
        },
    }
);

const Screen = mongoose.model("Screen", screenSchema);

module.exports = Screen;