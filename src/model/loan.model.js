const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LoanSchema = new Schema({
product: {
  type: Schema.Types.ObjectId,
  ref: "product"
},
startLoanDate:{
  type: Date,
  required: [true,'the startdate is missing, please enter a startdate.']
},
endLoanDate:{
  type: Date
}
});

const Loan = mongoose.model('loan', LoanSchema);

module.exports = Loan;
