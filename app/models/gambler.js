'use strict';

var Mongo = require('mongodb'),
    _     = require('lodash');

function Gambler(o){
  this.name     = o.name;
  this.photo    = o.photo;
  this.spouse   = {name: o.spouse.name, photo: o.spouse.photo};
  this.cash     = parseFloat(o.cash);
  this.assets   = [];
  this.results  = {wins:0, losses:0};
}

Object.defineProperty(Gambler, 'collection', {
  get: function(){return global.mongodb.collection('gamblers');}
});

Gambler.create = function(o, cb){
  var g = new Gambler(o);
  Gambler.collection.save(g, cb);
};

Gambler.all = function(cb){
  Gambler.collection.find().toArray(cb);
  console.log(Gambler);
};

Gambler.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Gambler.collection.findOne({_id:_id}, function(err,g){
    cb(err,_.create(Gambler.prototype, g));
  });
};

Gambler.prototype.sellAsset = function(name){
  var assets = _.remove(this.assets, function(asset){return asset.name === name;});
  this.cash += assets[0].value;
};

Gambler.prototype.addAsset = function(o){
  var asset = {name:o.name, photo:o.photo, value:parseFloat(o.value)};
  this.assets.push(asset);
};

Gambler.prototype.save = function(cb){
  Gambler.collection.save(this, cb);
};

module.exports = Gambler;

