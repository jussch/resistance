/* CAUTION: When using the generators, this file is modified in some places.
 *          This is done via AST traversal - Some of your formatting may be lost
 *          in the process - no functionality should be broken though.
 *          This modifications only run once when the generator is invoked - if
 *          you edit them, they are not updated again.
 */
import React, {
  Component,
  PropTypes
} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Main from '../components/Main';
/* Populated by react-webpack-redux:reducer */
class App extends Component {
  render() {
    const {actions, users, game} = this.props;
    return <Main actions={actions} users={users} game={game}/>;
  }
}
/* Populated by react-webpack-redux:reducer
 *
 * HINT: if you adjust the initial type of your reducer, you will also have to
 *       adjust it here.
 */
App.propTypes = {
  actions: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  game: PropTypes.object.isRequired
};
function mapStateToProps(state) {
  /* Populated by react-webpack-redux:reducer */
  const props = {
    users: state.users,
    game: state.game
  };
  return props;
}
function mapDispatchToProps(dispatch) {
  /* Populated by react-webpack-redux:action */
  const actions = {
    join: require('..\\actions\\users\\join.js'),
    leave: require('..\\actions\\users\\leave.js'),
    fetch: require('..\\actions\\users\\fetch.js'),
    access: require('..\\actions\\users\\access.js'),
    start: require('..\\actions\\game\\start.js'),
    cancel: require('..\\actions\\game\\cancel.js'),
    countdown: require('..\\actions\\game\\countdown.js'),
    initialize: require('..\\actions\\game\\initialize.js'),
    stop: require('..\\actions\\game\\stop.js'),
    getState: require('..\\actions\\game\\getState.js')
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
