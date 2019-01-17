const assert = require('assert');
const request = require('supertest');
const app = require('../../src/app.js');
const mongoose = require('mongoose');
const Rent = mongoose.model('rent');

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
    const rent = new Rent({ startRentDate: '2017-05-1' });
    rent.save().then(() =>{
      request(app)
      .put('/api/rents/' + rent._id)
      .send({startRentDate: '2016-05-1'})
      .end(() =>{
        Rent.findOne({ _id: rent._id})
        .then(rent => {
          assert(rent.startRentDate == "2016-05-1" );
          done();
        });
      });
    });
  });
  it('DELETE to /api/rents/id can delete a driver', done =>{
    const rent = new Rent({ startRentDate: "2016-05-18T16:00:00Z" });
    rent.save().then(() =>{
      request(app)
      .delete('/api/rents/' + rent._id)
      .end(()=>{
        Rent.findOne({startRentDate: "2016-05-18T16:00:00Z" })
        .then((rent) =>{
          assert(rent === null);
          done();
        });
      });
    });
  });
});
