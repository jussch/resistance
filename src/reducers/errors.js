/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
const _ = require('lodash');
const initialState = [];
function createError(data) {
  return {
    id: data.id,
    message: data.message,
  };
}

module.exports = function(state = initialState, action) {
  let nextState = _.cloneDeep(state);

  switch(action.type) {
    case 'GET_ERROR': {
      nextState.push(createError(action.parameter));
      return nextState;
    } break;
    case 'EXPIRE_ERROR': {
      const id = action.parameter.id;
      nextState = _.reject(nextState, errorObj => errorObj.id === id);

      return nextState;
    } break;
    default: {
      return state;
    }
  }
};
