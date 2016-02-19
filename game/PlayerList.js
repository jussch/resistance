/**
 * Created by Justin on 2016-02-19.
 */
'use strict';
const _ = require('lodash');

function PlayerList(players) {
  this.list = players || {};
}

PlayerList.fromArray = function(array) {
  return new PlayerList(_.mapKeys(array, 'id'));
};

PlayerList.prototype.emit = function(event, data) {
  _.invokeMap(this.list, 'emit', event, data);
  return this;
};

PlayerList.prototype.getPlayer = function(id) {
  return this.list[id] || null;
};

PlayerList.prototype._add = function(player) {
  this.list[player.id] = player;
};

PlayerList.prototype.add = function(player) {
  if (_.isArray(player)) {
    _.each(player, this._add.bind(this));
  } else {
    this._add(player);
  }
  return this;
};

PlayerList.prototype.reset = function(players) {
  this.list = _.mapKeys(players, 'id');
};

PlayerList.prototype.getNicknames = function() {
  return _.map(this.list, 'nickname');
};

PlayerList.prototype.fromNicknames = function(nicknames) {
  return this.filter((player) => {
    return _.includes(nicknames, player.nickname);
  });
};

PlayerList.prototype.getSize = function() {
  return _.size(this.list);
};

PlayerList.prototype.selectRandom = function(num) {
  return PlayerList.fromArray(_.sampleSize(this.list, num));
};

PlayerList.prototype.filter = function(pred) {
  return PlayerList.fromArray(_.filter(this.list, pred));
};

PlayerList.prototype.each = function(callback) {
  _.each(this.list, callback);
  return this;
};
