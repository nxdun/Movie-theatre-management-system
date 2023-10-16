const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const privatescreenSchema = new Schema({
  privscname: { type: String, required: true },
  privseatcapacity: { type: Number, required: true },
  privscprice: { type: Number, required: true },
  privsclocation: { type: String, required: true },
  privscdescription: { type: String, required: true },
  privscimage: { type: String, required: true },
});

const Privatescreen = mongoose.model("privatescreen", privatescreenSchema);

module.exports = Privatescreen;
