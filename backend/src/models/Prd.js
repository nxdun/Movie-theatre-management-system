const mongoose = require('mongoose');

const PrdSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    countInStock:{
        type: Number,
        required: true
    },
    imageUrl:{
        type: String,
        required: true
    }
});

const Prd = mongoose.model('Prd', PrdSchema);

module.exports = Prd;
