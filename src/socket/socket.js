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

module.exports = function connect(store) {
  var socket = io();

  socket.on('users:join', data => store.dispatch(userJoin(data)));
  socket.on('users:leave', data => store.dispatch(userLeave(data)));
  socket.on('users:fetch', data => store.dispatch(userFetch(data)));

  socket.on('game:countdown', data => store.dispatch(gameCountdown(data)));
  socket.on('game:initialize', data => store.dispatch(gameInitialize(data)));
  socket.on('game:stop', data => store.dispatch(gameStop(data)));
  socket.on('game:get:state', data => store.dispatch(gameGetState(data)));

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
  });
};
