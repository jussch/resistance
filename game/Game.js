/**
 * Created by Justin on 2016-02-19.
 */
const _ = require('lodash');
const gameAttrs = ['starting', 'started', 'countDown'];
const gamePhases = ['LOBBY', 'INITIAL', 'PICK', 'VOTE', 'MISSION', 'END'];

function Game(io, room) {
  this.io = io;
  this.room = room;

  this.starting = false;
  this.started = false;
  this.countDown = 0;
  this.countDownInterval = null;
  this.phase = 'LOBBY';
}

Game.prototype.emit = function(event, data) {
  this.io.to(this.room).emit(event, data);
  return this;
};

Game.prototype.getState = function() {
  return _.pick(this, gameAttrs);
};

Game.prototype.startInitialCountdown = function() {
  if (this.started) return;

  this.stopInitialCountdown();
  this.starting = true;
  this.countDown = 5;
  this.emit('game:countdown', { countDown: this.countDown });

  this.countDownInterval = setInterval(() => {
    this.countDown--;
    if (this.countDown) {
      this.emit('game:countdown', { countDown: this.countDown });
    } else {
      this.started = true;
      this.stopInitialCountdown();
      this.emit('game:initialize');
    }
  }, 1000);
};

Game.prototype.stopInitialCountdown = function() {
  this.starting = false;
  clearInterval(this.countDownInterval);
};

Game.prototype.enterPhase = function(phase) {
  if (!_.includes(gamePhases, phase)) {
    throw new Error(phase + ' is not an allowable phase');
  }

  this.phase = phase;
  return this;
};

module.exports = Game;
