const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const stockSchema = new Schema({
    P_id:  {type: Schema.Types.ObjectId, ref: 'product'},
    St_productId: {type: Schema.Types.ObjectId, ref: 'suppplier'},
    St_quantity: {
        type: Number,
        required: true,
    },
    St_price: {
        type: Number,
        required: true,
    }
})
    const Stock = mongoose.model("stock", stockSchema);
    module.exports = Stock;