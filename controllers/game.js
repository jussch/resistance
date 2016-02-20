/*eslint no-console:0 */
/**
 * Created by Justin on 2016-02-18.
 */
'use strict';
const games = {};
const _ = require('lodash');
const Util = require('./utilities');
const gameSettings = require('./../game/config');
const Game = require('./../game/Game');

// TODO: Restrict access to rooms that have already started.

module.exports = function LobbyControllers(io, socket) {
  socket.on('game:start', data => {
    const room = socket.gameRoom;
    const game = initializeGame(room);
    const users = Util.getUsers(io, room);
    socketLog('game:start');
    if (!gameSettings(users.length)) return;

    game.startInitialCountdown(() => {
      game.setPlayers(Util.getUsers(io, room));
    });
  });

  socket.on('game:cancel', data => {
    const game = games[socket.gameRoom];
    socketLog('game:cancel');
    game.stopInitialCountdown();
    game.emit('game:stop');
  });

  socket.on('player:ready', data => {
    const game = games[socket.gameRoom];
    socketLog('player:ready');
    game.readyPlayer(socket);
  });

  socket.on('player:select:candidates', data => {
    const game = games[socket.gameRoom];
    socketLog('player:select:candidates');
    game.selectCandidates(socket, data.candidates);
  });

  socket.on('player:vote', data => {
    const game = games[socket.gameRoom];
    socketLog('player:vote');
    game.playerVote(socket, data.pass);
  });

  socket.on('player:complete:mission', data => {
    const game = games[socket.gameRoom];
    socketLog('player:complete:mission');
    game.playerCompleteMission(socket, data.success);
  });

  function initializeGame(room) {
    return games[room] || (games[room] = new Game(io, room));
  }

  function socketLog() {
    console.log.apply(console, [socket.nickname, 'requests:'].concat(_.toArray(arguments)));
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

  socket.emit('game:get:state', { game: game.getState() });
};
