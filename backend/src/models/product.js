const mongoose = require('mongoose');
const Schema = mongoose.Schema; 
const productSchema = new Schema({
    P_id: {
        type: String,
        required: true,
    },
    P_name: {
        type: String,
        required: true,
    },
    P_Description: {
        type: String,
        required: true,
    },
    P_price: {
        type: String,
        required: true,
    },
    P_quantity: {
        type: String,
        required: true,
    },
   
    P_status: {
        type: Boolean,
        required: true,
    },          
    P_createDate: { 
        type: Date,
        required: true,
    },
})  
const ProductItem = mongoose.model("productItem", productSchema);
module.exports = ProductItem;