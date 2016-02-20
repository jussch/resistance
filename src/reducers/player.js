/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
const initialState = {
  selectedCandidates: [],
  requestCompleteMission: null,
  requestReady: false,
  requestVote: null,
  requestCandidates: null,
  nickname: null,
  isCurrentLeader: false,
};
const _ = require('lodash');

module.exports = function(state = initialState, action) {
  let nextState = _.cloneDeep(state);

  switch(action.type) {
    case 'SELECT_CANDIDATE': {
      return nextState;
    } break;
    case 'PLAYER_REQUEST_COMPLETE': {
      return nextState;
    } break;
    case 'PLAYER_REQUEST_READY': {
      return nextState;
    } break;
    case 'PLAYER_REQUEST_VOTE': {
      return nextState;
    } break;
    case 'SEND_CANDIDATE': {
      return nextState;
    } break;
    case 'PLAYER_SENT_COMPLETE': {
      return nextState;
    } break;
    case 'PLAYER_SENT_READY': {
      return nextState;
    } break;
    case 'PLAYER_SENT_VOTE': {
      return nextState;
    } break;
    case 'SENT_CANDIDATE': {
      return nextState;
    } break;
    case 'SELECT_LEADER': {
      return nextState;
    } break;
    default: {
      return state;
    }
  }
}
