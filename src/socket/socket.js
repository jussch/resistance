/**
 * Created by Justin on 2016-02-16.
 */
const io = require('socket.io-client');

const handleError = require('../actions/handleError');

const userJoin = require('../actions/users/join');
const userLeave = require('../actions/users/leave');
const userFetch = require('../actions/users/fetch');
const userAccessSent = require('../actions/users/accessSent');

const gameCountdown = require('../actions/game/countdown');
const gameInitialize = require('../actions/game/initialize');
const gameStartSent = require('../actions/game/startSent');
const gameCancelSent = require('../actions/game/cancelSent');
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
const rematchReceived = require('../actions/player/receivedRematch');

const playerSentCandidate = require('../actions/player/playerSentCandidate');
const playerSentRematch = require('../actions/player/sentRematch');
const playerSentComplete = require('../actions/player/playerSentComplete');
const playerSentReady = require('../actions/player/playerSentReady');
const playerSentVote = require('../actions/player/playerSentVote');

module.exports = function connect(store) {
  var socket = io();

  socket.on('error', data => store.dispatch(handleError(data)));
  socket.on('error:message', data => store.dispatch(handleError(data)));

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
  socket.on('game:rematch', data => store.dispatch(rematchReceived(data)));

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
      store.dispatch(userAccessSent());
      socket.emit('users:access', {
        room: state.users.requestRoom || null,
        nickname: state.users.myNickname,
      });
    }

    // Game client-to-server actions
    if (state.game) {
      if (state.game.requestStart) {
        store.dispatch(gameStartSent());
        socket.emit('game:start');
      }

      if (state.game.requestCancel) {
        store.dispatch(gameCancelSent());
        socket.emit('game:cancel');
      }
    }

    if (state.player) {
      const player = state.player;
      if (player.requestCompleteMission) {
        store.dispatch(playerSentComplete());
        socket.emit('player:complete:mission', { success: player.missionSuccess });
      }

      if (player.requestVote) {
        store.dispatch(playerSentVote());
        socket.emit('player:vote', { pass: player.vote });
      }

      if (player.requestReady) {
        store.dispatch(playerSentReady());
        socket.emit('player:ready');
      }

      if (player.requestCandidates) {
        store.dispatch(playerSentCandidate());
        socket.emit('player:select:candidates', { candidates: player.selectedCandidates });
      }

      if (player.requestRematch) {
        store.dispatch(playerSentRematch());
        socket.emit('player:request:rematch');
      }
    }
  });
};
