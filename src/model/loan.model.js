const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LoanSchema = new Schema({
product: {
  type: Schema.Types.ObjectId,
  ref: "product"
},
startLendDate:{
  type: Date,
  required: [true,'the startdate is missing, please enter a startdate.']
},
endLendDate:{
  type: Date
}
});

const Loan = mongoose.model('loan', LoanSchema);

module.exports = Loan;
