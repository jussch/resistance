/*eslint no-console:0 */
/**
 * Created by Justin on 2016-02-16.
 */
'use strict';
const _ = require('lodash');
const GameControlller = require('./game');

module.exports = function UserControllers(io) {
  io.on('connection', socket => {
    socket.gameRoom = null;
    socket.nickname = _.uniqueId('nickname_');
    console.log('Connection Received:', socket.nickname);

    socket.on('users:access', (data) => {
      goToRoom(data.room);
    });

    socket.on('disconnect', () => {
      fetchUsers(socket.gameRoom);
    });

    GameControlller(io, socket);

    function goToRoom(room) {
      console.log('Moving', socket.nickname, 'from', socket.gameRoom, 'to', room);
      if (socket.gameRoom) {
        socket.leave(socket.gameRoom);
        socket.emit('users:leave');
        fetchUsers(socket.gameRoom);
      }

      socket.gameRoom = room;
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

