const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productModel = new Schema(
  {
    image: { type: String},
    name: {type: String},
    type: {type: String},
    price: {type: Number},
    available: {type: Boolean, default: true},
    description: { type: String},
  },
  { timestamps: true }
);

module.exports = mongoose.model("products", productModel);
