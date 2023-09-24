const mongoose = require('mongoose');
const Schema = mongoose.Schema; 
const productSchema = new Schema({
    P_id: {
        type: String,
        required: true,
    },
    P_type: {
        type: String,
        required: true,
    },
    P_name: {
        type: String,
        required: true,
    },
    P_description: {
        type: String,
        required: true,
    },
    P_image: {
        type: String,
        required: false,
    },
    P_supplierId: {     
        type: String,
        required: true,
    },
    P_price: {
        type: Number,
        required: true,
    },
    P_quantity: {
        type: Number,
        required: true,
    },
   
    P_status: {
        type: Boolean,
        required: true,
    },        
    P_reoderLevel: {
        type: Number,
        required: true,
    },  
    P_createDate: { 
        type: Date,
        required: true,
    },
})  
const Product = mongoose.model("product", productSchema);
module.exports = Product;