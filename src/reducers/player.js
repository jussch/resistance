/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
const _ = require('lodash');
const initialState = {
  selectedCandidates: [],
  missionSuccess: null,
  vote: null,
  requestCompleteMission: false,
  requestVote: false,
  requestReady: false,
  requestRematch: false,
  requestCandidates: false,
  nickname: null,
  isCurrentLeader: false,
  isOnMission: false,

  spy: false,
  ready: false,
  voted: false,
  completedMission: false,
};

module.exports = function(state = initialState, action) {
  let nextState = _.cloneDeep(state);

  switch(action.type) {
    case 'PLAYER_READY': {
      if (action.parameter.player === state.nickname) nextState.ready = true;
      return nextState;
    } break;
    case 'PLAYER_VOTE': {
      if (action.parameter.player === state.nickname) nextState.voted = true;
      return nextState;
    } break;
    case 'PLAYER_COMPLETE_MISSION': {
      if (action.parameter.player === state.nickname) nextState.completedMission = true;
      return nextState;
    } break;
    case 'ACCESS': {
      nextState.nickname = action.parameter.nickname;
      return nextState
    } break;
    case 'SELECT_CANDIDATE': {
      const idx = nextState.selectedCandidates.indexOf(action.parameter.candidate);
      if (idx === -1) {
        nextState.selectedCandidates.push(action.parameter.candidate);
      } else {
        nextState.selectedCandidates.splice(idx, 1);
      }

      return nextState;
    } break;
    case 'REQUEST_REMATCH': {
      nextState.requestRematch = true;
      return nextState;
    } break;
    case 'SENT_REMATCH': {
      nextState.requestRematch = false;
      return nextState;
    } break;
    case 'RECEIVED_REMATCH': {
      nextState.spy = false;
      nextState.ready = false;
      nextState.voted = false;
      nextState.completedMission = false;
      return nextState;
    } break;
    case 'PLAYER_REQUEST_COMPLETE_MISSION': {
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
    case 'SEND_CANDIDATES': {
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
    case 'PLAYER_SENT_CANDIDATE': {
      nextState.selectedCandidates = [];
      nextState.requestCandidates = false;
      nextState.isCurrentLeader = false;
      return nextState;
    } break;
    case 'SELECT_LEADER': {
      if (action.parameter.leader === nextState.nickname) {
        nextState.isCurrentLeader = true;
      }

      return nextState;
    } break;
    case 'ENTER_MISSION': {
      nextState.completedMission = false;
      if (_.includes(action.parameter.candidates, nextState.nickname)) {
        nextState.isOnMission = true;
      }

      return nextState;
    } break;
    case 'ENTER_VOTE': {
      nextState.voted = false;

      return nextState;
    } break;
    case 'PLAYER_SET_DATA': {
      if (_.includes(action.parameter.players, nextState.nickname)) {
        _.extend(nextState, _.omit(action.parameter, 'players'));
      }

      return nextState;
    } break;
    default: {
      return state;
    }
  }
};
