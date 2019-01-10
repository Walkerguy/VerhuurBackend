const User = require('../model/user.model')

module.exports = {

  greeting(req,res){
    res.send({hi:'there'})
  },

  create(req,res,next){
    const userProps = req.body;
    User.create(userProps)
    .then(user => res.send(user))
    .catch(next);
  },

  edit(req,res,next){
    const userId = req.params.id;
    const userProps = req.body;
    User.findByIdAndUpdate({_id:userId},userProps)
    .then(() => User.findById({_id:userId}))
    .then(user => res.send(user))
    .catch(next);
  },

  delete(req,res,next){
    const userId = req.params.id;
    User.findByIdAndRemove({_id: userId})
    .then(user => res.status(204).send(user))
    .catch(next);
  },

  read(req,res,next){
    User.find({})
    .populate({path: "product"})
    .populate({path: "loan"})
    .then((user) => res.status(200).send(user))
    .catch(next);
  },

  readById(req,res,next){
    const userId = req.params.id;
    User.findById({_id: userId})
    .populate({path: "product"})
    .populate({path: "loan"})
    .then((user) => res.status(200).send(user))
    .catch(next);
  },
  //push hem onder de naam id, als je dat niet doet ben je niet zo slim
  addProduct(req,res,next){
    const userId = req.params.id;
    const product = req.body.id;
    User.findByIdAndUpdate({ _id: userId },
      { $push: { products: product } })
    .then((user) => res.status(200).send(user))
    .catch(next);
  },

  addLoan(req,res,next){
    const userId = req.params.id;
    const loan = req.body.id;
    Company.findByIdAndUpdate({ _id: userId },
      { $push: { loans: loan } })
    .then((user) => res.status(200).send(user))
    .catch(next);
  },
  // pushACompany(req,res,next){
  //   const gameId = req.params.id;
  // }
};
