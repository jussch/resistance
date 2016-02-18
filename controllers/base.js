/**
 * Created by Justin on 2016-02-16.
 */
'use strict';
const _ = require('lodash');
const users = {};

module.exports = function UserControllers(io) {
  io.on('connection', socket => {
    let socketRoom = null;
    const socketId = socket.id;
    users[socketId] = socket;
    console.log('Connection Received:', socketId);

    fetchUsers();

    socket.on('join room', (data) => {
      goToRoom(data.room);
    });

    socket.on('leave room', () => {
      goToRoom(null);
    });

    socket.on('disconnect', () => {
      delete users[socketId];
      fetchUsers(socketRoom);
    });

    function goToRoom(room) {
      if (socketRoom) {
        socket.leave(socketRoom);
        fetchUsers(socketRoom);
      }

      socketRoom = room;
      if (room) {
        socket.join(room);
      }
    }
  });

  function fetchUsers(room) {
    (room ? io.to(room) : io)
      .emit('users:fetch', { users: _.keys(users) });
  }
};

