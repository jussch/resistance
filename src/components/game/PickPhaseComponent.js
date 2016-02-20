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
    const leader = _.find(this.props.players, 'isLeader');
    const numPlayers = game.settings.rounds[game.currentRound];
    const failsNeeded = game.settings.fails[game.currentRound] === 1 ? 'once' : 'twice';

    if (this.props.player.isCurrentLeader) {
      return (
        <div className="pickphase-component">
          You are the leader. Select the {numPlayers} players you want to send on a mission.
          The spies need to fail this mission {failsNeeded}.
          <SelectablePlayerListComponent {...this.props} onSelect={this.onSelect.bind(this)} />
          <button onClick={this.handleClick.bind(this)}>Finished</button>
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
