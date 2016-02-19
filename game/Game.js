/**
 * Created by Justin on 2016-02-19.
 */
const _ = require('lodash');
const gameSettings = require('./config');
const PlayerList = require('./PlayerList');
const Player = require('./Player');
const PhaseData = require('./PhaseData');
const gameAttrs = ['starting', 'started', 'countDown'];
const gamePhases = ['LOBBY', 'INITIAL', 'PICK', 'VOTE', 'MISSION', 'END'];

function Game(io, room) {
  this.io = io;
  this.room = room;

  this.players = new PlayerList();

  this.settings = null;
  this.starting = false;
  this.started = false;
  this.countDown = 0;
  this.countDownInterval = null;
  this.phase = 'LOBBY';
  this.round = 0;

  this.initializePhaseData();
}

Game.prototype.initializePhaseData = function() {
  this._phaseData = new PhaseData({
    INITIAL: new PhaseData({ numOfPlayers: 0, playersReady: 0 }),
    PICK: new PhaseData({ previousLeaders: [] }),
    VOTE: new PhaseData(),
    MISSION: new PhaseData(),
    END: new PhaseData(),
  });
};

Game.prototype.getPhaseData = function(phase) {
  return this._phaseData.get(phase.toUpperCase());
};

Game.prototype.setPlayers = function(players) {
  this.players.reset(_.map(players, socket => new Player(socket)));
  return this;
};

Game.prototype.getPlayer = function(socket) {
  const id = _.isObject(socket) ? socket.id : socket;
  return this.players.getPlayer(id);
};

Game.prototype.emit = function(event, data) {
  this.io.to(this.room).emit(event, data);
  return this;
};

Game.prototype.getState = function() {
  return _.pick(this, gameAttrs);
};

Game.prototype.startInitialCountdown = function(cb) {
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
      this.stopInitialCountdown();
      cb.call(this);
      this.enterPhase('initial');
    }
  }, 1000);
};

Game.prototype.stopInitialCountdown = function() {
  this.starting = false;
  clearInterval(this.countDownInterval);
};

Game.prototype.enterPhase = function(phase) {
  phase = phase.toUpperCase();
  if (!_.includes(gamePhases, phase)) {
    throw new Error(phase + ' is not an allowable phase');
  }

  this.phase = phase;
  switch (this.phase) {
    case 'INITIAL': this.enterPhaseInitial(); break;
    case 'PICK': this.enterPhasePick(); break;
    case 'VOTE': this.enterPhaseVote(); break;
    case 'MISSION': this.enterPhaseMission(); break;
    case 'END': this.enterPhaseEnd(); break;
  }

  return this;
};

Game.prototype.enterPhaseInitial = function() {
  this.started = true;
  this.emit('game:initialize');

  const numOfPlayers = this.players.getSize();
  this.getPhaseData('INITIAL').set('numOfPlayers', numOfPlayers);
  this.settings = gameSettings(numOfPlayers);
  this.emit('game:settings', this.settings);
  const spies = this.players.selectRandom(this.settings.numOfSpies).each((player) => {
    player.setIsSpy();
  });

  const spyNames = spies.getNicknames();

  spies.emit('player:set:data', { spy: true, spies: spyNames });
};

Game.prototype.readyPlayer = function(player) {
  player = this.getPlayer(player);
  player.setIsReady();
  const phaseData = this.getPhaseData('INITIAL');
  phaseData.increment('playersReady');
  if (phaseData.get('playersReady') === phaseData.get('numOfPlayers')) {
    this.enterPhase('pick');
  }

  return this;
};

Game.prototype.enterPhasePick = function() {
  const phaseData = this.getPhaseData('PICK');
  const previousLeaders = phaseData.get('previousLeaders');
  const potentialLeaders = this.players.filter((player) => {
    return !_.includes(previousLeaders, player);
  });

  const leader = potentialLeaders.selectRandom(1);
  phaseData.set('previousLeaders', previousLeaders.concat(leader));
  this.emit('game:select:leader', {
    leader: leader.nickname,
    round: this.round,
  });
};

Game.prototype.selectCandidates = function(player, candidates) {
  player = this.getPlayer(player);
  // TODO: Convert Candidates from nicknames to players.
};

Game.prototype.enterPhaseVote = function() {

};

Game.prototype.playerVote = function(player, passVote) {
  player = this.getPlayer(player);
};

Game.prototype.enterPhaseMission = function() {

};

Game.prototype.enterPhaseEnd = function() {

};

module.exports = Game;
