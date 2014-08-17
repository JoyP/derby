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
      var g = {name:'bob', photo:'bob.png', spouse:{name:'jane', photo:'jane.png'}, cash: '5000'};

      Gambler.create(g, function(err,gambler){
        expect(gambler._id).to.be.instanceof(Mongo.ObjectID);
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

  describe('.findById', function(){
    it ('should find one gambler by its ID', function(done){
      Gambler.findById('000000000000000000000001', function(err, gambler){
        expect(gambler).to.be.instanceof(Gambler);
        expect(gambler.name).to.equal('Vincent');
        done();
      });
    });
  });

  describe('#sellAsset', function(){
    it('should remove an asset from a gambler', function(){
      Gambler.findById('000000000000000000000002', function(err, g){
        g.sellAsset('truck', function(err, asset){
          expect(g.cash).to.equal(4500);
          expect(g.assets).to.have.length(2);
        });
      });
    });
  });

  describe('#addAsset', function(){
    it('should add an asset to a gambler', function(){
      Gambler.findById('000000000000000000000003', function(err, g){
        var a = {name:'mazda', photo: 'mazda.png', value: '30000'};
        g.addAsset(a, function(err, asset){
          expect(g.assets).to.have.length(4);
        });
      });
    });
  });

});

