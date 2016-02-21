'use strict';

import React from 'react';
import _ from 'lodash';
import PlayerComponent from '../players/PlayerComponent';
import SelectablePlayerListComponent from '../players/SelectablePlayerListComponent';

require('styles/game/PickPhase.scss');

class PickPhaseComponent extends React.Component {
  onSelect(player) {
    const game = this.props.game;
    const current = this.props.player;

    if (
      player.isSelected ||
      game.settings.rounds[game.currentRound] > current.selectedCandidates.length
    ) {
      this.props.actions.selectCandidate({ candidate: player.nickname });
    }
  }

  handleClick(e) {
    e.preventDefault();
    const game = this.props.game;
    const current = this.props.player;

    if (game.settings.rounds[game.currentRound] === current.selectedCandidates.length) {
      this.props.actions.sendCandidates();
    }
  }

  render() {
    const game = this.props.game;
    const current = this.props.player;
    const leader = _.find(this.props.players, 'isLeader');
    const numPlayers = game.settings.rounds[game.currentRound];
    const playersLeft = numPlayers - current.selectedCandidates.length;
    const failsNeeded = game.settings.fails[game.currentRound] === 1 ? 'once' : 'twice';

    if (this.props.player.isCurrentLeader) {
      return (
        <div className="pickphase-component">
          <h1>You are the <strong className="leader-text">leader</strong>.</h1>
          <div>Select the {numPlayers} players you want to send on a mission.</div>
          <div>The spies need to <span className="spy-text">sabotage</span> this mission <b>{failsNeeded}</b> to score a point.</div>
          <SelectablePlayerListComponent {...this.props} onSelect={this.onSelect.bind(this)} playersLeft={playersLeft} />
          <div className="button-group">
            <span className="button-group-addon">
              <div>Player Left</div>
              <div className="players-left">{playersLeft}</div>
            </span>
            <button
              className="button"
              onClick={this.handleClick.bind(this)}
              disabled={playersLeft !== 0}
            >Finished</button>
          </div>
        </div>
      )
    }

    return (
      <div className="pickphase-component">
        <PlayerComponent player={leader}/> is currently picking the next mission.
      </div>
    );
  }
}

PickPhaseComponent.displayName = 'GamePickPhaseComponent';

// Uncomment properties you need
// PickPhaseComponent.propTypes = {};
// PickPhaseComponent.defaultProps = {};

export default PickPhaseComponent;
