const assert = require('assert');
const request = require('supertest');
const app = require('../../src/app.js');
const mongoose = require('mongoose');
const Game = mongoose.model('game');

describe('Games controller', () => {
  it('post to api/games creates a new game', done => {
    Game.count().then(count =>{
        request(app)
        .post('/api/games')
        .send({ gameName: 'Mario' })
        .end(()=>{
          Game.count().then(newCount =>{
            assert(count+1 === newCount);
            done();
          });
      });
    });
  });
  it('Put to api/games edits a existing game',done =>{
    const game = new Game({ gameName: 'Mario' });

    game.save().then(() =>{
      request(app)
      .put('/api/games/' + game._id)
      .send({gameName:"Sims"})
      .end(() =>{
        Game.findOne({ _id: game._id})
        .then(game => {
          assert(game.gameName === "Sims");
          done();
        });
      });
    });
  });

  it('DELETE to /api/games/id can delete a driver', done =>{
    const game = new Game({ gameName: 'Mario' });
    game.save().then(() =>{
      request(app)
      .delete('/api/games/' + game._id)
      .end(()=>{
        Game.findOne({gameName: 'Mario'})
        .then((game) =>{
          assert(game === null);
          done();
        });
      });
    });
  });
});
