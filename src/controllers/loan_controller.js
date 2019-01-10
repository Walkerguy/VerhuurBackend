const Loan = require('../model/loan.model')

module.exports = {

  create(req,res,next){
    const loanProps = req.body;
    Loan.create(loanProps)
    .then(loan => res.send(loan))
    .catch(next);
  },
  
//gebruik deze edit ook voor het toevoegen van een enddate later gezien dit geen push is
  edit(req,res,next){
    const loanId = req.params.id;
    const loanProps = req.body;
    Loan.findByIdAndUpdate({_id:loanId},loanProps)
    .then(() => Loan.findById({_id:loanId}))
    .then(loan => res.send(loan))
    .catch(next);
  },

  delete(req,res,next){
    const loanId = req.params.id;
    Loan.findByIdAndRemove({_id: loanId})
    .then(loan => res.status(204).send(loan))
    .catch(next);
  },

  read(req,res,next){
    Loan.find({})
    .then((loan) => res.status(200).send(loan))
    .catch(next);
  },

  readById(req,res,next){
    const loanId = req.params.id;
    Loan.findById({_id: loanId})
    .then((loan) => res.status(200).send(loan))
    .catch(next);
  }
}
