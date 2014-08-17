/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect     = require('chai').expect,
    Gambler    = require('../../app/models/gambler'),
    dbConnect  = require('../../app/lib/mongodb'),
    Mongo       = require('mongodb'),
    cp         = require('child_process'),
    db         = 'gambler-test';

describe('Gambler', function(){
  before(function(done){
    dbConnect(db, function(){
      done();
    });
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      console.log(stdout, stderr);
      done();
    });
  });

  describe('constructor', function(){
    it('should create a new gambler', function(){
      var newGambler  = {name:'bob', photo:'bob.png', spouse:{name:'jane', photo:'jane.png'}, cash: '5000'},
      g               = new Gambler(newGambler);

      expect(g).to.be.instanceof(Gambler);
      expect(g.name).to.equal('bob');
      expect(g.photo).to.equal('bob.png');
      expect(g.spouse.name).to.equal('jane');
      expect(g.spouse.photo).to.equal('jane.png');
      expect(g.cash).to.equal(5000);
      expect(g.assets).to.have.length(0);
      expect(g.results.wins).to.equal(0);
      expect(g.results.losses).to.equal(0);
    });
  });

  describe('.create', function(){
    it('should save an object to the database', function(done){
      var newGambler  = {name:'bob', photo:'bob.png', spouse:{name:'jane', photo:'jane.png'}, cash: '5000'},
      g               = new Gambler(newGambler);

      Gambler.create(g, function(err,gambler){
        expect(g._id).to.be.instanceof(Mongo.ObjectID);
        done();
      });
    });
  });

  describe('.all', function(){
    it('should get all gamblers', function(done){
      Gambler.all(function(err, gamblers){
        expect(gamblers).to.have.length(3);
        done();
      });
    });
  });
});

