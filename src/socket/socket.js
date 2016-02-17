/**
 * Created by Justin on 2016-02-16.
 */

module.exports = function connect() {
  var socket = io();

  socket.on('message', ({ message }) => {
    console.log('MESSAGE RECIEVED:', message);
  });
};
