const mongoose = require('mongoose');

const movieShedulerSchema = new mongoose.Schema({

    MovieName :{
        type: String,
        required : true,
        trim:true
    },
    MovieId :{
        type: String,
        required : true,
        trim:true
    },
    TheaterName: {
        type: String,
        required : true,
        trim:true
    },
    StartDate: {
        type: String,
        required : true,
        trim:true
    },
    EndDate: {
        type: String,
        required : true,
        trim:true
    },
    ShowTime: {
        type: String,
        required : true,
        trim:true
    }

},{timestamps:true});


const MovieShedular = mongoose.model('MovieShedular',movieShedulerSchema);

module.exports = MovieShedular;