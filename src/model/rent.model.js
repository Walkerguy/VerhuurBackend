const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RentSchema = new Schema({
products: [{
  type: Schema.Types.ObjectId,
  ref: "product"
}],
daysRented:{
  type: Number,
  required: [true]
},
totalPrice:{
  type: Number,
  required: [true]
}
});

const Rent = mongoose.model('rent', RentSchema);

module.exports = Rent;
