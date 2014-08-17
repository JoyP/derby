'use strict';

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
  Gambler.collecion.save(g, cb);
};

Gambler.all = function(cb){
  Gambler.collection.find().toArray(cb);
  console.log(Gambler);
};

module.exports = Gambler;

