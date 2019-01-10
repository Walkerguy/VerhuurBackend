const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
name: {
  type: String,
  required: [true,'the name is missing, please enter a name.']
},
categorie: {
  type: String
},
description: {
  type: String
},
imageUrl: {
  type: String
},
costPerDay: {
  type: String
},
lend: {
  type: Boolean
}
});

const Product = mongoose.model('product', ProductSchema);

module.exports = Product;
