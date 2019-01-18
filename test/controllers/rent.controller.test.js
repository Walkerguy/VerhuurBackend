const assert = require('assert');
const request = require('supertest');
const app = require('../../src/app.js');
const mongoose = require('mongoose');
const Rent = mongoose.model('rent');
const Product = mongoose.model('product');


describe('Rents controller', () => {
  it('post to api/rents creates a new rent', done => {
    Rent.count().then(count =>{
        request(app)
        .post('/api/rents')
        .send({ startRentDate: "2016-05-18T16:00:00Z" })
        .end(()=>{
          Rent.count().then(newCount =>{
            assert(count+1 === newCount);
            done();
          });
      });
    });
  });
  it('Put to api/rents edits a existing rent',done =>{
    const datum = new Date("2015/11/20 04:11");
    const rent = new Rent({ startRentDate: "2014/11/20 04:11" });
    rent.save().then(() =>{
      request(app)
      .put('/api/rents/' + rent._id)
      .send({startRentDate: "2015/11/20 04:11"})
      .end(() =>{
        Rent.findOne({ _id: rent._id})
        .then(rent => {
          console.log(rent.startRentDate.toString() + "<<< DEZE EN DEZE >>>" + datum.toString());
          assert(rent.startRentDate.toString() ===  datum.toString());
          done();
        });
      });
    });
  });

  it('PUT to /api/rents/product/:id can add a product', done =>{
    const product = new Product({ name: "hoi" });
    product.save();
    const rent = new Rent({ startRentDate: "2016-05-18T16:00:00Z" });
    rent.save().then(() =>{
      request(app)
      .put('/api/rents/product/' + rent._id)
      .send({'id': product._id})
      .end(() =>{
        Rent.findOne({ _id: rent._id})
        .then(rent => {
          assert(rent.products[0].toString() === product._id.toString());
          done();
        });
      });
    });
  });
});

it('DELETE to /api/products/id can delete a prod', done =>{
  const rent = new Rent({ startRentDate: "2016-05-18T16:00:00Z" });
  rent.save().then(() =>{
    request(app)
    .delete('/api/rents/' + rent._id)
    .end(()=>{
      Rent.findOne({startRentDate: "2016-05-18T16:00:00Z"})
      .then((rent) =>{
        assert(rent === null);
        done();
      });
    });
  });
});
