/**
 * Created by Justin on 2016-02-16.
 */
'use strict';
const _ = require('lodash');

module.exports = function UserControllers(io) {
  io.on('connection', socket => {
    let socketRoom = null;
    socket.nickname = _.uniqueId('nickname_');
    console.log('Connection Received:', socket.nickname);

    socket.on('users:access', (data) => {
      goToRoom(data.room);
    });

    socket.on('disconnect', () => {
      fetchUsers(socketRoom);
    });

    function goToRoom(room) {
      console.log('Moving', socket.nickname, 'from', socketRoom, 'to', room);
      if (socketRoom) {
        socket.leave(socketRoom);
        socket.emit('users:leave');
        fetchUsers(socketRoom);
      }

      socketRoom = room;
      if (room) {
        socket.join(room);
        socket.emit('users:join', { room: room });
        fetchUsers(room);
      }
    }
  });

  function fetchUsers(room) {
    if (!room) return;
    const roster = getUsers(room);
    const names = _.map(roster, 'nickname');

    io.to(room).emit('users:fetch', { users: names });
  }

  function getUsers(room) {
    const roomObj = io.sockets.adapter.rooms[room];
    const clients = roomObj && roomObj.sockets;
    return _(clients)
      .keys()
      .map(key => io.sockets.connected[key])
      .value();
  }
};

