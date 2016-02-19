/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
const initialState = {};

module.exports = function(state = initialState, action) {
  /* Keep the reducer clean - do not mutate the original state. */
  let nextState = Object.assign({}, state);

  switch(action.type) {
    case 'START': {
      nextState.requestStart = true;
      return nextState;
    } break;
    case 'CANCEL': {
      nextState.requestCancel = true;
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
      return nextState;
    } break;
    case 'STOP': {
      nextState.requestCancel = false;
      nextState.countDown = null;
      nextState.starting = false;
      return nextState;
    } break;
    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
};
