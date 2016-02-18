/**
 * Created by Justin on 2016-02-18.
 */
'use strict';

var games = {};
module.exports = function LobbyControllers(io, socket) {
  socket.on('game:start', data => {

  });

  socket.on('game:cancel', data => {

  });
};

function initializeGame(room) {
  var game = games[room] || (games[room] = {});
  game.countDown = 5;
  return game;
}
