/**
 * Created by Justin on 2016-02-19.
 */
'use strict';
const _ = require('lodash');

function PhaseData(initialState) {
  this.initialState = _.extend({}, initialState);
  this.data = _.extend({}, initialState);
}

PhaseData.prototype.set = function(name, data) {
  this.data[name] = data;
  return this;
};

PhaseData.prototype.extend = function(name, data) {
  this.data[name] = _.extend({}, this.data[name], data);
  return this;
};

PhaseData.prototype.add = function(name, data) {
  this.data[name] = this.data[name].concat(data);
  return this;
};

PhaseData.prototype.get = function(name) {
  return this.data[name];
};

PhaseData.prototype.increment = function(name) {
  this.data[name]++;
  return this;
};

PhaseData.prototype.decrement = function(name) {
  this.data[name]++;
  return this;
};

PhaseData.prototype.clear = function() {
  this.data = _.extend({}, this.initialState);
  return this;
};

module.exports = PhaseData;
