/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
const _ = require('lodash');
const initialState = {
  started: false,
  starting: false,
  countDown: 0,
  requestStart: false,
  requestCancel: false,
  settings: null,
  phase: 'lobby',
  leader: null,
  currentRound: 0,
  wins: [],
  winner: null,
};

module.exports = function(state = initialState, action) {
  /* Keep the reducer clean - do not mutate the original state. */
  let nextState = _.cloneDeep(state);

  switch(action.type) {
    case 'START': {
      nextState.requestStart = true;
      return nextState;
    } break;
    case 'CANCEL': {
      nextState.requestCancel = true;
      return nextState;
    } break;
    case 'ENTER_MISSION': {
      nextState.phase = 'mission';
      return nextState;
    } break;
    case 'ENTER_VOTE': {
      nextState.phase = 'vote';
      return nextState;
    } break;
    case 'GAME_OVER': {
      nextState.phase = 'end';
      nextState.winner = action.parameter.winner;
      return nextState;
    } break;
    case 'GET_SETTINGS': {
      nextState.settings = _.extend({}, action.parameter);
      return nextState;
    } break;
    case 'MISSION_COMPLETE': {
      nextState.wins.push(action.parameter.winner);
      return nextState;
    } break;
    // aka. ENTER_PICK
    case 'SELECT_LEADER': {
      nextState.phase = 'pick';
      nextState.currentRound = action.parameter.currentRound;
      return nextState;
    } break;
    case 'COUNTDOWN': {
      nextState.countDown = action.parameter.countDown;
      nextState.starting = true;
      nextState.requestStart = false;
      return nextState;
    } break;
    case 'INITIALIZE': {
      nextState.started = true;
      nextState.starting = false;
      nextState.phase = 'initial';
      return nextState;
    } break;
    case 'STOP': {
      nextState.requestCancel = false;
      nextState.countDown = null;
      nextState.starting = false;
      return nextState;
    } break;
    case 'GET_STATE': {
      Object.assign(nextState, action.parameter.game);
      console.info('got state:', action.parameter.game);
      return nextState;
    } break;
    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
};
