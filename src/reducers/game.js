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
  currentRound: 0,
  currentLeader: null,
  currentCandidates: [],
  missions: [],
  winner: null,
};

function createMission(initialData) {
  return {
    playersNeeded: initialData.playersNeeded,
    sabotagesNeeded: initialData.sabotagesNeeded,
    report: {
      sabotages: null,
      winner: null,
      players: [],
    },
    suggestedTeams: [

    ],
  }
}

function createTeam(data) {
  return {
    leader: data.leader,
    players: data.players,
    passes: data.passes,
    rejections: data.rejections,
  }
}

module.exports = function(state = initialState, action) {
  /* Keep the reducer clean - do not mutate the original state. */
  let nextState = _.cloneDeep(state);

  switch(action.type) {
    case 'START': {
      nextState.requestStart = true;
      return nextState;
    } break;
    case 'START_SENT': {
      nextState.requestStart = false;
      return nextState;
    } break;
    case 'CANCEL': {
      nextState.requestCancel = true;
      return nextState;
    } break;
    case 'CANCEL_SENT': {
      nextState.requestCancel = false;
      return nextState;
    } break;
    case 'RECEIVED_REMATCH': {
      nextState.started = true;
      nextState.phase = 'lobby';
      nextState.winner = null;
      nextState.currentRound = 0;
      nextState.missions = [];
      nextState.settings = null;
      return nextState;
    } break;
    case 'ENTER_MISSION': {
      nextState.phase = 'mission';
      nextState.missions[state.currentRound].report.players = _.clone(state.currentCandidates);
      return nextState;
    } break;
    case 'ENTER_VOTE': {
      nextState.phase = 'vote';
      nextState.currentCandidates = action.parameter.candidates;
      return nextState;
    } break;
    case 'GAME_OVER': {
      nextState.phase = 'end';
      nextState.winner = action.parameter.winner;
      nextState.currentRound = -1;
      return nextState;
    } break;
    case 'GET_SETTINGS': {
      nextState.settings = _.extend({}, action.parameter);
      _.times(5, (i) => {
        nextState.missions[i] = createMission({
          playersNeeded: nextState.settings.rounds[i],
          sabotagesNeeded: nextState.settings.fails[i],
        });
      });

      return nextState;
    } break;
    case 'GET_PLAYER_VOTES': {
      nextState.missions[state.currentRound].suggestedTeams.push(createTeam({
        leader: state.currentLeader,
        players: _.clone(state.currentCandidates),
        passes: action.parameter.passes,
        rejections: action.parameter.fails,
      }));

      return nextState;
    } break;
    case 'MISSION_COMPLETE': {
      _.extend(nextState.missions[state.currentRound].report, {
        winner: action.parameter.winner,
        sabotages: action.parameter.sabotages
      });

      return nextState;
    } break;
    // aka. ENTER_PICK
    case 'SELECT_LEADER': {
      nextState.phase = 'pick';
      nextState.currentCandidates = [];
      nextState.currentRound = action.parameter.round;
      nextState.currentLeader = action.parameter.leader;
      return nextState;
    } break;
    case 'COUNTDOWN': {
      nextState.countDown = action.parameter.countDown;
      nextState.starting = true;
      return nextState;
    } break;
    case 'INITIALIZE': {
      nextState.started = true;
      nextState.starting = false;
      nextState.phase = 'initial';
      return nextState;
    } break;
    case 'STOP': {
      nextState.countDown = null;
      nextState.starting = false;
      return nextState;
    } break;
    case 'GET_STATE': {
      _.extend(nextState, action.parameter.game);
      return nextState;
    } break;
    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
};
