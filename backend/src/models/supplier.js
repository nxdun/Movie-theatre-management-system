const mongoose = require('mongoose');
const Schema = mongoose.Schema; 
const supplierSchema = new Schema({
    S_id: {
        type: String,
        required: true,
    },
    S_name: {
        type: String,
        required: true,
    },
    S_address: {
        type: String,
        required: true,
    },
    S_email: {
        type: String,
        required: true,
    },
    
    S_status: {
        type: Boolean,
        required: true,
    },
    S_contactNo: {
        type: Number,
        required: true,
    },
    S_createDate: { 
        type: Date,
        required: true,
    },
})  
const Supplier = mongoose.model("suppplier", supplierSchema);
module.exports = Supplier;