/*eslint no-console:0 */
/**
 * Created by Justin on 2016-02-19.
 */
'use strict';
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

Game.prototype.log = function() {
  console.log.apply(console, [`Game[${this.room}]:`].concat(_.toArray(arguments)));
};

Game.prototype.initializePhaseData = function() {
  this._phaseData = new PhaseData({
    GENERAL: new PhaseData({ spyWins: 0, resistanceWins: 0 }),
    INITIAL: new PhaseData({ numOfPlayers: 0, playersReady: 0 }),
    PICK: new PhaseData({ previousLeaders: [] }),
    VOTE: new PhaseData({ voted: {}, passed: [], failed: [], candidates: null }),
    MISSION: new PhaseData({ successes: 0, sabotages: 0, candidates: null, left: 0 }),
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

Game.prototype.getSettingsForRound = function(round) {
  round = round == null ? this.round : round;
  return this.settings && {
    candidatesLength: this.settings.rounds[round],
    failsNeeded: this.settings.fails[round],
  };
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

Game.prototype.isPhase = function(phase) {
  return this.phase === phase.toUpperCase();
};

Game.prototype.enterPhase = function(phase) {
  phase = phase.toUpperCase();
  if (!_.includes(gamePhases, phase)) {
    throw new Error(phase + ' is not an allowable phase');
  }

  this.phase = phase;
  this.log('Entering Phase:', this.phase);

  let phaseFunction;
  switch (this.phase) {
    case 'INITIAL': phaseFunction = this.enterPhaseInitial; break;
    case 'PICK': phaseFunction = this.enterPhasePick; break;
    case 'VOTE': phaseFunction = this.enterPhaseVote; break;
    case 'MISSION': phaseFunction = this.enterPhaseMission; break;
    case 'END': phaseFunction = this.enterPhaseEnd; break;
  }

  phaseFunction.apply(this, _.drop(arguments, 1));

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
  if (!this.isPhase('INITIAL')) return;
  player = this.getPlayer(player);
  player.setIsReady();
  const phaseData = this.getPhaseData('INITIAL');
  phaseData.increment('playersReady');
  if (phaseData.get('playersReady') === phaseData.get('numOfPlayers')) {
    this.enterPhase('pick');
  }
};

Game.prototype.enterPhasePick = function() {
  const phaseData = this.getPhaseData('PICK');
  const previousLeaders = phaseData.get('previousLeaders');
  const potentialLeaders = this.players.filter((player) => {
    return !_.includes(previousLeaders, player);
  });

  if (!potentialLeaders.length) {
    // If there are no more potentail leaders, the winners are the spies.
    this.enterPhase('end', { winner: 'spies' });
    return;
  }

  const leader = potentialLeaders.selectRandom(1);
  phaseData.set('previousLeaders', previousLeaders.concat(leader));
  this.emit('game:select:leader', {
    leader: leader.nickname,
    round: this.round,
  });
};

Game.prototype.selectCandidates = function(player, candidates) {
  if (!this.isPhase('PICK')) return;
  candidates = this.players.fromNicknames(candidates);
  this.enterPhase('VOTE', {
    candidates
  });
};

Game.prototype.enterPhaseVote = function(options) {
  options = options || {};
  const candidates = options.candidates;

  this.getPhaseData('VOTE').clear().set('candidates', candidates);
  this.emit('game:enter:vote', { candidates });
};

Game.prototype.playerVote = function(player, passVote) {
  if (!this.isPhase('VOTE')) return;

  player = this.getPlayer(player);
  const phaseData = this.getPhaseData('VOTE');
  const voted = phaseData.get('voted');

  if (voted[player.id]) return;

  phaseData.extend('voted', { [player.id]: player });
  phaseData.add(passVote ? 'passed' : 'failed', player.nickname);

  this.emit('player:voted', { player: player.nickame });

  if (_.size(voted) === this.players.getSize()) {
    this.endPhaseVote();
  }
};

Game.prototype.endPhaseVote = function() {
  const phaseData = this.getPhaseData('VOTE');
  const passed = phaseData.get('passed');
  const failed = phaseData.get('failed');
  this.emit('player:votes', {
    passed,
    failed,
  });

  if (passed.length >= failed.length) {
    this.enterPhase('MISSION', { candidates: phaseData.get('candidates') });
  } else {
    this.enterPhase('PICK');
  }
};

Game.prototype.enterPhaseMission = function(options) {
  options = options || {};
  const candidates = options.candidates;

  // Clear the PICK data, as its a new round after this.
  this.getPhaseData('PICK').clear();
  this.getPhaseData('MISSION').clear()
    .set('candidates', candidates)
    .set('left', _.size(candidates));

  this.emit('game:enter:mission', {
    candidates: candidates.getNicknames(),
  });
};

Game.prototype.playerCompleteMission = function(player, isSuccess) {
  if (!this.isPhase('MISSION')) return;
  player = this.getPlayer(player);
  const phaseData = this.getPhaseData('MISSION');

  phaseData.increment(isSuccess ? 'successes' : 'sabotages');
  phaseData.decrement('left');
  this.emit('player:finished:mission', { player: player.nickname });

  if (!phaseData.get('left')) {
    this.endPhaseMission();
  }
};

Game.prototype.endPhaseMission = function() {
  const phaseData = this.getPhaseData('MISSION');
  const general = this.getPhaseData('GENERAL');
  const roundSettings = this.getSettingsForRound();

  const spyWin = phaseData.get('sabotages') >= roundSettings.failsNeeded;
  const winner = spyWin ? 'spies' : 'resistance';
  const field = spyWin ? 'spyWins' : 'resistanceWins';
  this.round++;

  general.increment(field);
  if (general.get(field) >= 3) {
    this.enterPhase('END', { winner });
  } else {
    this.emit('game:mission:complete', { winner });
    this.enterPhase('PICK');
  }
};

Game.prototype.enterPhaseEnd = function(options) {
  options = options || {};
  const winner = options.candidates;

  this.emit('game:end', { winner });
};

module.exports = Game;
