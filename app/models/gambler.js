'use strict';

function Gambler(o){
  this.name     = o.name;
  this.photo    = o.photo;
  this.spouse   = {};
  this.cash     = o.cash;
  this.assets   = [];
  this.results  = {};
}

Object.defineProperty(Gambler, 'collection', {
  get: function(){return global.mongodb.collection('gamblers');}
});

Gambler.all = function(cb){
  Gambler.collection.find().toArray(cb);
  console.log(Gambler);
};

module.exports = Gambler;

