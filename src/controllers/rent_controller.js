const Rent = require('../model/rent.model')
const Product = require('../model/product.model')

module.exports = {

  create(req,res,next){
    const rentProps = req.body;
    Rent.create(rentProps)
    .then(() => Product.findByIdAndUpdate({_id:product},{"lend":true}))
    .then(rent => res.send(rent))
    .catch(next);
  },

//gebruik deze edit ook voor het toevoegen van een enddate later gezien dit geen push is
  edit(req,res,next){
    const rentId = req.params.id;
    const rentProps = req.body;
    Rent.findByIdAndUpdate({_id:rentId},rentProps)
    .then(() => Rent.findById({_id:rentId}))
    .then(rent => res.send(rent))
    .catch(next);
  },

  delete(req,res,next){
    const rentId = req.params.id;
    Rent.findByIdAndRemove({_id: rentId})
    .then(rent => res.status(204).send(rent))
    .catch(next);
  },

  read(req,res,next){
    Rent.find({})
    .populate('products')
    .then((rent) => res.status(200).send(rent))
    .catch(next);
  },

  readById(req,res,next){
    const rentId = req.params.id;
    Rent.findById({_id: rentId})
    .populate('products')
    .then((rent) => res.status(200).send(rent))
    .catch(next);
  },
  addProduct(req,res,next){
  const rentId = req.params.id;
  const product = req.body.id;

  Rent.findByIdAndUpdate({ _id: rentId },
    { $push: { products: product } })
  .then(() => Product.findByIdAndUpdate({_id:product},{"lend":true}))
  .then(product => res.send(product))
  .catch(next);
}
}
