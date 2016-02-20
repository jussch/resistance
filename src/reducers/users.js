/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
const initialState = {
  list: [] ,
  requestRoom: null,
  myNickname: null,
  lastAccessed: {
    nickname: null,
    room: null,
  }
};

module.exports = function(state = initialState, action) {
  let nextState = Object.assign({}, state);
  nextState.list = state.list.slice();

  switch(action.type) {
    case 'ACCESS': {
      nextState.requestRoom = action.parameter.room;
      nextState.myNickname = action.parameter.nickname;
      nextState.lastAccessed = {
        nickname: nextState.nickname,
        room: action.parameter.room,
      };
      return nextState;
    } break;
    case 'ACCESS_SENT': {
      nextState.requestRoom = null;
      return nextState;
    } break;
    case 'JOIN': {
      nextState.room = action.parameter.room;
      nextState.list = [];
      return nextState;
    } break;
    case 'LEAVE': {
      nextState.room = null;
      nextState.list = [];
      return nextState;
    } break;
    case 'FETCH': {
      nextState.list = action.parameter.users;
      return nextState;
    } break;
    default: {
      return state;
    }
  }
};
