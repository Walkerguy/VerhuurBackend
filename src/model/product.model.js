const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
name: {
  type: String,
  required: [true,'the name is missing, please enter a name.']
},
category: {
  type: String
},
description: {
  type: String
},
imageurl: {
  type: String
},
costPerDay: {
  type: Number
},
lend: {
  type: Boolean
}
});

const Product = mongoose.model('product', ProductSchema);

module.exports = Product;
