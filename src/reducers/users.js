/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
const initialState = { users: [] };

module.exports = function(state = initialState, action) {
  /* Keep the reducer clean - do not mutate the original state. */
  let nextState = Object.assign({}, state);
  nextState.users = state.users.slice();

  switch(action.type) {
    case 'JOIN': {
      // Modify next state depending on the action and return it
      nextState.users.push(action.user);
      return nextState;
    } break;
    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
};
