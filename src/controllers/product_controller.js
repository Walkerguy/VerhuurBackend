const Product = require('../model/product.model');

module.exports = {

  create(req,res,next){
    const productProps = req.body;
    Product.create(productProps)
    .then(product => res.json({success: true, msg:'Data registered'}))
    .catch(next);
  },
  //gebruik deze edit ook om een product naar lend te zetten of om een prijs aan te passen
  edit(req,res,next){
    const productId = req.params.id;
    const productProps = req.body;
    Product.findByIdAndUpdate({_id:productId},productProps)
    .then(() => Product.findById({_id:productId}))
    .then(product => res.send(product))
    .catch(next);
  },

  delete(req,res,next){
    const productId = req.params.id;
    Product.findByIdAndRemove({_id: productId})
    .then(product => res.status(204).send(product))
    .catch(next);
  },

  read(req,res,next){
    Product.find({})
    .then((product) => res.status(200).send(product))
    .catch(next);
  },

  readById(req,res,next){
    const productId = req.params.id;
    Product.findById({_id: productId})
    .then((product) => res.status(200).send(product))
    .catch(next);
  }
}
