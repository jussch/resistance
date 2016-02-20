/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
const initialState = {
  selectedCandidates: [],
  missionSuccess: null,
  vote: null,
  requestCompleteMission: false,
  requestVote: false,
  requestReady: false,
  requestCandidates: false,
  nickname: null,
  isCurrentLeader: false,
  isOnMission: false,
};
const _ = require('lodash');

module.exports = function(state = initialState, action) {
  let nextState = _.cloneDeep(state);

  switch(action.type) {
    case 'SELECT_CANDIDATE': {
      nextState.selectedCandidates.push(action.parameter.candidate);
      return nextState;
    } break;
    case 'PLAYER_REQUEST_COMPLETE': {
      nextState.missionSuccess = action.parameter.success;
      nextState.requestCompleteMission = true;
      nextState.isOnMission = false;
      return nextState;
    } break;
    case 'PLAYER_REQUEST_READY': {
      nextState.requestReady = true;
      return nextState;
    } break;
    case 'PLAYER_REQUEST_VOTE': {
      nextState.vote = action.parameter.vote;
      nextState.requestVote = true;
      return nextState;
    } break;
    case 'SEND_CANDIDATE': {
      nextState.requestCandidates = true;
      return nextState;
    } break;
    case 'PLAYER_SENT_COMPLETE': {
      nextState.missionSuccess = null;
      nextState.requestCompleteMission = false;
      return nextState;
    } break;
    case 'PLAYER_SENT_READY': {
      nextState.requestReady = false;
      return nextState;
    } break;
    case 'PLAYER_SENT_VOTE': {
      nextState.vote = null;
      nextState.requestVote = false;
      return nextState;
    } break;
    case 'SENT_CANDIDATE': {
      nextState.selectedCandidates = null;
      nextState.requestCandidates = false;
      return nextState;
    } break;
    case 'SELECT_LEADER': {
      if (action.parameter.leader === nextState.nickname) {
        nextState.isCurrentLeader = true;
      }

      return nextState;
    } break;
    case 'ENTER_MISSION': {
      if (_.includes(action.parameter.candidates, nextState.nickname)) {
        nextState.isOnMission = true;
      }

      return nextState;
    } break;
    default: {
      return state;
    }
  }
};
