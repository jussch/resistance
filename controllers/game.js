/**
 * Created by Justin on 2016-02-18.
 */
'use strict';
const games = {};
const _ = require('lodash');

module.exports = function LobbyControllers(io, socket) {
  socket.on('game:start', data => {
    countDownGame(initializeGame(socket.gameRoom));
  });

  socket.on('game:cancel', data => {
    const game = games[socket.gameRoom];
    clearInterval(game.interval);
    emitToSocketRoom('game:stop')
  });

  function emitToSocketRoom(event, data) {
    if (!socket.gameRoom) return;
    io.to(socket.gameRoom).emit(event, data);
  }

  function countDownGame(game) {
    if (game.started) return;

    emitToSocketRoom('game:countdown', { countDown: game.countDown });
    clearInterval(game.interval);
    game.interval = setInterval(() => {
      game.countDown--;
      if (game.countDown) {
        emitToSocketRoom('game:countdown', { countDown: game.countDown });
      } else {
        game.started = true;
        clearInterval(game.interval);
        emitToSocketRoom('game:initialize');
      }
    }, 1000);
  }
};

function initializeGame(room) {
  var game = games[room] || (games[room] = {});
  if (!game.started) {
    game.countDown = 5;
    game.started = false;
  }

  return game;
}
