/**
 * Created by Justin on 2016-02-19.
 */
'use strict';
const _ = require('lodash');

function PhaseData(initalState) {
  this.initialState = _.extend({}, initalState);
  this.data = _.extend({}, initalState);
}

PhaseData.prototype.set = function(name, data) {
  this.data[name] = data;
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
