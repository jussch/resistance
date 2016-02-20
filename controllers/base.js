/*eslint no-console:0 */
/**
 * Created by Justin on 2016-02-16.
 */
'use strict';
const _ = require('lodash');
const Util = require('./utilities');
const GameController = require('./game');

module.exports = function UserControllers(io) {
  io.on('connection', socket => {
    socket.gameRoom = null;
    socket.nickname = _.uniqueId('nickname_');
    console.log('Connection Received:', socket.nickname);

    socket.on('users:access', (data) => {
      if (!GameController.canJoinGame(data.room)) return;
      socket.nickname = data.nickname;
      goToRoom(data.room);
    });

    socket.on('disconnect', () => {
      fetchUsers(socket.gameRoom);
    });

    GameController(io, socket);

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
        GameController.socketJoinsGame(socket, room);
      }
    }
  });

  function fetchUsers(room) {
    if (!room) return;
    const roster = Util.getUsers(io, room);
    const names = _.map(roster, 'nickname');

    io.to(room).emit('users:fetch', { users: names });
  }
};

