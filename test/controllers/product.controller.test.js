const assert = require('assert');
const request = require('supertest');
const app = require('../../src/app.js');
const mongoose = require('mongoose');
const Product = mongoose.model('product');

describe('Products controller', () => {
  it('post to api/products creates a new product', done => {
    Product.count().then(count =>{
        request(app)
        .post('/api/products')
        .send({ name: 'Mario' })
        .end(()=>{
          Product.count().then(newCount =>{
            assert(count+1 === newCount);
            done();
          });
      });
    });
  });
  it('Put to api/products edits a existing product',done =>{
    const product = new Product({ name: 'Mario' });

    product.save().then(() =>{
      request(app)
      .put('/api/products/' + product._id)
      .send({name:"Sims"})
      .end(() =>{
        Product.findOne({ _id: product._id})
        .then(product => {
          assert(product.name === "Sims");
          done();
        });
      });
    });
  });

  it('DELETE to /api/products/id can delete a driver', done =>{
    const product = new Product({ name: 'Mario' });
    product.save().then(() =>{
      request(app)
      .delete('/api/products/' + product._id)
      .end(()=>{
        Product.findOne({name: 'Mario'})
        .then((product) =>{
          assert(product === null);
          done();
        });
      });
    });
  });
});
