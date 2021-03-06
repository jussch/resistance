/* Combine all available reducers to a single root reducer.
 *
 * CAUTION: When using the generators, this file is modified in some places.
 *          This is done via AST traversal - Some of your formatting may be lost
 *          in the process - no functionality should be broken though.
 *          This modifications only run once when the generator is invoked - if
 *          you edit them, they are not updated again.
 */
import { combineReducers } from 'redux';
/* Populated by react-webpack-redux:reducer */
const reducers = {
  users: require('..\\reducers\\users.js'),
  game: require('..\\reducers\\game.js'),
  player: require('..\\reducers\\player.js'),
  players: require('..\\reducers\\players.js'),
  errors: require('..\\reducers\\errors.js')
};
module.exports = combineReducers(reducers);
