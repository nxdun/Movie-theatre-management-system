const mongoose = require("mongoose");

const advertisementSchema = mongoose.Schema(
    {
         name:{
            type: String,
            required: [true, "Please add a Advertisement Title"]
        },
       description:{
            type: String,
            required: [true, "Please add a Description"]
        },
        startdate:{
            type: Date,
            required: [true, "Please add a Start Date"]
        },
        enddate:{
                type: Date,
                required: [true, "Please add a End Date"]
        },
        type:{
            type: String,
            required: [true, "Please add a Type"]
    },
    }
    
);

const Advertisement = mongoose.model("Advertisement", advertisementSchema);

module.exports = Advertisement;