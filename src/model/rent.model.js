const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RentSchema = new Schema({
product: {
  type: Schema.Types.ObjectId,
  ref: "product"
},
startRentDate:{
  type: Date,
  required: [true,'the startdate is missing, please enter a startdate.']
},
endRentDate:{
  type: Date
}
});

const Rent = mongoose.model('rent', RentSchema);

module.exports = Rent;
