/**
 * Created by Justin on 2016-02-18.
 */
'use strict';
const games = {};
const _ = require('lodash');
const gameSettings = require('./../game/config');
const Game = require('./../game/Game');

// TODO: Restrict access to rooms that have already started.

module.exports = function LobbyControllers(io, socket) {
  socket.on('game:start', data => {
    initializeGame(socket.gameRoom).startInitialCountdown();
  });

  socket.on('game:cancel', data => {
    const game = games[socket.gameRoom];
    game.stopInitialCountdown();
    game.emit('game:stop');
  });

  function initializeGame(room) {
    return games[room] || (games[room] = new Game(io, room));
  }
};


/**
 * Returns boolean representing if the game can be joined or not.
 * @param room
 * @returns {boolean}
 */
module.exports.canJoinGame = function(room) {
  const game = games[room];

  // TODO: Detect Player Count
  return !game || !game.started || !game.starting;
};

/**
 * Sends the info to the socket giving them the current game info.
 * @param socket
 * @param room
 */
module.exports.socketJoinsGame = function(socket, room) {
  const game = games[room];
  console.log(socket.nickname, 'joins the game', room, '. Game Initialized:', !!game);
  if (!game) return;

  socket.emit('game:get:state', { game: _.pick(game, gameAttrs) });
};
