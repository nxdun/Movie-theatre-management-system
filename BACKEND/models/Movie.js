const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MovieSchema = new Schema(
    {
        title:{ 
            type : String,
            required : true
        },

        genre:{ 
            type : String,
            required:true
        },

        director:{ 
            type : String,
            //required:true
        },
        releaseDate:{ 
            type : String,
            required : true
        },

        languages:{ 
            type : String,
            required:true
        },

        runtime:{ 
            type : Number,
            //required:true
        },
        Rating:{ 
            type : String,
            //required:true
        },
        
})

const Movie = mongoose.model("Movie", MovieSchema);// add 1
module.exports = Movie;
