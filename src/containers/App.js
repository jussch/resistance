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
    const {actions, users, game, player, players} = this.props;
    return (
      <Main
        actions={actions}
        users={users}
        game={game}
        player={player}
        players={players}/>
    );
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
  game: PropTypes.object.isRequired,
  player: PropTypes.object.isRequired,
  players: PropTypes.object.isRequired
};
function mapStateToProps(state) {
  /* Populated by react-webpack-redux:reducer */
  const props = {
    users: state.users,
    game: state.game,
    player: state.player,
    players: state.players
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
    getState: require('..\\actions\\game\\getState.js'),
    selectCandidate: require('..\\actions\\player\\selectCandidate.js'),
    sendCandidates: require('..\\actions\\player\\sendCandidates.js'),
    playerRequestVote: require('..\\actions\\player\\playerRequestVote.js'),
    playerRequestCompleteMission: require('..\\actions\\player\\playerRequestCompleteMission.js'),
    playerCompleteMission: require('..\\actions\\player\\playerCompleteMission.js'),
    playerVote: require('..\\actions\\player\\playerVote.js'),
    playerRequestReady: require('..\\actions\\player\\playerRequestReady.js'),
    playerReady: require('..\\actions\\player\\playerReady.js'),
    getSettings: require('..\\actions\\game\\getSettings.js'),
    selectLeader: require('..\\actions\\game\\selectLeader.js'),
    enterVote: require('..\\actions\\game\\enterVote.js'),
    getPlayerVotes: require('..\\actions\\player\\getPlayerVotes.js'),
    enterMission: require('..\\actions\\game\\enterMission.js'),
    missionComplete: require('..\\actions\\game\\missionComplete.js'),
    gameOver: require('..\\actions\\game\\gameOver.js'),
    playerSetData: require('..\\actions\\player\\playerSetData.js'),
    playerGetData: require('..\\actions\\player\\playerGetData.js'),
    playerSentCandidate: require('..\\actions\\player\\playerSentCandidate.js'),
    playerSentComplete: require('..\\actions\\player\\playerSentComplete.js'),
    playerSentReady: require('..\\actions\\player\\playerSentReady.js'),
    playerSentVote: require('..\\actions\\player\\playerSentVote.js'),
    requestRematch: require('..\\actions\\player\\requestRematch.js'),
    receivedRematch: require('..\\actions\\player\\receivedRematch.js'),
    sentRematch: require('..\\actions\\player\\sentRematch.js'),
    accessSent: require('..\\actions\\users\\accessSent.js')
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
