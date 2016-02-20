/**
 * Created by Justin on 2016-02-19.
 */
'use strict';
const _ = require('lodash');

exports.getUsers = function getUsers(io, room) {
  const roomObj = io.sockets.adapter.rooms[room];
  const clients = roomObj && roomObj.sockets;
  return _(clients)
    .keys()
    .map(key => io.sockets.connected[key])
    .value();
};
