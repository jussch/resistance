/**
 * Created by Justin on 2016-02-16.
 */
const io = require('socket.io-client');
const userJoin = require('../actions/users/join');
const userLeave = require('../actions/users/leave');
const userFetch = require('../actions/users/fetch');

const gameCountdown = require('../actions/game/countdown');
const gameInitialize = require('../actions/game/initialize');
const gameStop = require('../actions/game/stop');
const gameGetState = require('../actions/game/getState');
const gameEnterMission = require('../actions/game/enterMission');
const gameEnterVote = require('../actions/game/enterVote');
const gameGameOver = require('../actions/game/gameOver');
const gameGetSettings = require('../actions/game/getSettings');
const gameMissionComplete = require('../actions/game/missionComplete');
const gameSelectLeader = require('../actions/game/selectLeader');

const playerGetVotes = require('../actions/player/getPlayerVotes');
const playerCompleteMission = require('../actions/player/playerCompleteMission');
const playerGetData = require('../actions/player/playerGetData');
const playerSetData = require('../actions/player/playerSetData');
const playerReady = require('../actions/player/playerReady');
const playerVote = require('../actions/player/playerVote');

const playerSentCandidate = require('../actions/player/playerSentCandidate');
const playerSentComplete = require('../actions/player/playerSentComplete');
const playerSentReady = require('../actions/player/playerSentReady');
const playerSentVote = require('../actions/player/playerSentVote');

module.exports = function connect(store) {
  var socket = io();

  socket.on('users:join', data => store.dispatch(userJoin(data)));
  socket.on('users:leave', data => store.dispatch(userLeave(data)));
  socket.on('users:fetch', data => store.dispatch(userFetch(data)));

  socket.on('game:countdown', data => store.dispatch(gameCountdown(data)));
  socket.on('game:initialize', data => store.dispatch(gameInitialize(data)));
  socket.on('game:stop', data => store.dispatch(gameStop(data)));
  socket.on('game:get:state', data => store.dispatch(gameGetState(data)));
  socket.on('game:enter:mission', data => store.dispatch(gameEnterMission(data)));
  socket.on('game:enter:vote', data => store.dispatch(gameEnterVote(data)));
  socket.on('game:end', data => store.dispatch(gameGameOver(data)));
  socket.on('game:settings', data => store.dispatch(gameGetSettings(data)));
  socket.on('game:mission:complete', data => store.dispatch(gameMissionComplete(data)));
  socket.on('game:select:leader', data => store.dispatch(gameSelectLeader(data)));

  socket.on('player:votes', data => store.dispatch(playerGetVotes(data)));
  socket.on('player:finished:mission', data => store.dispatch(playerCompleteMission(data)));
  socket.on('player:get:data', data => store.dispatch(playerGetData(data)));
  socket.on('player:set:data', data => store.dispatch(playerSetData(data)));
  socket.on('player:ready', data => store.dispatch(playerReady(data)));
  socket.on('player:voted', data => store.dispatch(playerVote(data)));

  store.subscribe(() => {
    const state = store.getState();

    // User client-to-server actions
    if (state.users && state.users.requestRoom != null) {
      // Short circuit if given false to send null.
      socket.emit('users:access', {
        room: state.users.requestRoom || null,
        nickname: state.users.myNickname,
      });
    }

    // Game client-to-server actions
    if (state.game) {
      if (state.game.requestStart) {
        socket.emit('game:start');
      }

      if (state.game.requestCancel) {
        socket.emit('game:cancel');
      }
    }

    if (state.player) {
      const player = state.player;
      if (player.requestCompleteMission) {
        socket.emit('player:complete:mission', { success: player.missionSuccess });
        store.dispatch(playerSentComplete());
      }

      if (player.requestVote) {
        socket.emit('player:vote', { pass: player.vote });
        store.dispatch(playerSentVote());
      }

      if (player.requestReady) {
        socket.emit('player:ready');
        store.dispatch(playerSentReady());
      }

      if (player.requestCandidates) {
        socket.emit('player:select:candidates', { candidates: player.selectedCandidates });
        store.dispatch(playerSentCandidate());
      }
    }
  });
};
