const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RentSchema = new Schema({
product: {
  type: Schema.Types.ObjectId,
  ref: "product"
},
daysRented:{
  type: Number
},
totalPrice:{
  type: Number
}
});

const Rent = mongoose.model('rent', RentSchema);

module.exports = Rent;
