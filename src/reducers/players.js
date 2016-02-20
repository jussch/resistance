/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
const _ = require('lodash');

function initialPlayer(nickname) {
  return {
    nickname,
    spy: null,
    ready: false,
    voted: false,
    completedMission: false,
    isCandidate: false,
    isLeader: false,
    isSelected: false,
    wasLeader: false,
    votes: [],
    missionsFailed: 1,
    missionCount: 0,
  }
}

module.exports = function(state = {}, action) {
  let nextState = _.cloneDeep(state);

  switch(action.type) {
    case 'SELECT_CANDIDATE': {
      nextState[action.parameter.candidate].isSelected = !nextState[action.parameter.candidate].isSelected;
      return nextState;
    } break;
    case 'GET_PLAYER_VOTES': {
      _.each(action.parameter.passed, (playerName) => {
        nextState[playerName].votes.push('PASS');
      });

      _.each(action.parameter.failed, (playerName) => {
        nextState[playerName].votes.push('FAIL');
      });

      return nextState;
    } break;
    case 'PLAYER_READY': {
      nextState[action.parameter.player].ready = true;
      return nextState;
    } break;
    case 'PLAYER_VOTE': {
      nextState[action.parameter.player].voted = true;
      return nextState;
    } break;
    case 'PLAYER_COMPLETE_MISSION': {
      nextState[action.parameter.player].completedMission = true;
      return nextState;
    } break;
    case 'PLAYER_GET_DATA': {
      nextState = {};
      _.each(action.parameter.players, (playerName) => {
        nextState[playerName] = initialPlayer(playerName);
      });

      return nextState;
    } break;
    case 'PLAYER_SET_DATA': {
      console.log('action.parameter of players', action.parameter);
      _.each(action.parameter.players, (playerName) => {
        _.extend(nextState[playerName], _.omit(action.parameter, 'players'));
      });

      return nextState;
    } break;
    // AKA. ENTER_PICK
    case 'SELECT_LEADER': {
      const wasLeader = _.find(nextState, { isLeader: true });
      if (wasLeader) wasLeader.wasLeader = true;

      nextState[action.parameter.leader].isLeader = true;
      return nextState;
    } break;
    case 'ENTER_VOTE': {
      _.each(nextState, (player) => {
        player.voted = false;
        player.isSelected = false;
      });

      _.each(action.parameter.candidates, (playerName) => {
        nextState[playerName].isCandidate = true;
      });

      return nextState;
    } break;
    case 'MISSION_COMPLETE': {
      _.each(nextState, (player) => {
        player.completedMission = false;
        if (player.isCandidate) {
          player.isCandidate = false;
          player.missionCount++;
          if (action.parameter.winner === 'spies') player.missionsFailed++;
        }
      });

      return nextState;
    } break;
    default: {
      return state;
    }
  }
};
