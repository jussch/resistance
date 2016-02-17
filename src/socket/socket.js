/**
 * Created by Justin on 2016-02-16.
 */
const userJoin = require('../actions/users/join');
const userLeave = require('../actions/users/leave');
const userFetch = require('../actions/users/fetch');

module.exports = function connect(store) {
  var socket = io();

  socket.on('message', ({ message }) => {
    console.log('MESSAGE RECIEVED:', message);
  });

  socket.on('users:join', data => store.dispatch(userJoin(data)));
  socket.on('users:leave', data => store.dispatch(userLeave(data)));
  socket.on('users:fetch', data => store.dispatch(userFetch(data)));
};
