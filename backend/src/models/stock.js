const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const stockSchema = new Schema({
    P_id:  {type: Schema.Types.ObjectId, ref: 'product'},
    P_name: {
        type: String,
        required: true,
    },
    s_id: {type: Schema.Types.ObjectId, ref: 'suppplier'},
    s_name: {
        type: String,
        required: true,
    },
    P_quantity: {
        type: String,
        required: true,
    },
    St_price: {
        type: String,
        required: true,
    },
    Reorder_level: {
        type: String,
        required: true,
    },
})
    const Stock = mongoose.model("stock", stockSchema);
    module.exports = Stock;