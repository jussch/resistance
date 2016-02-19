/**
 * Created by Justin on 2016-02-19.
 */
'use strict';
const _ = require('lodash');

function Player(socket) {
  this.socket = socket;
  this.id = socket.id;
  this.nickname = socket.nickname;
  this.isSpy = false;
  this.isReady = false;
}

Player.prototype.emit = function(event, data) {
  this.socket.emit(event, data);
  return this;
};

Player.prototype.setIsSpy = function(bool) {
  this.isSpy = !!bool;
  return this;
};

Player.prototype.setIsReady = function(bool) {
  this.isReady = !!bool;
  return this;
};

module.exports = Player;
