'use strict';

import React from 'react';
import _ from 'lodash';
import PlayerListComponent from '../players/PlayerListComponent';

require('styles/game/VotePhase.scss');

class VotePhaseComponent extends React.Component {
  handlePass(e) {
    e.preventDefault();
    this.props.actions.playerRequestVote({ vote: true });
  }

  handleReject(e) {
    e.preventDefault();
    this.props.actions.playerRequestVote({ vote: false });
  }

  render() {
    if (this.props.player.voted) {
      return (<div className="votephase-component">Voted.</div>);
    }

    const game = this.props.game;
    const candidates = _.filter(this.props.players, 'isCandidate');
    const failsNeeded = game.settings.fails[game.currentRound] === 1 ? 'once' : 'twice';
    return (
      <div className="votephase-component">
        The players up for the next mission: (fails needed: {failsNeeded})
        <PlayerListComponent players={candidates} />
        <button onClick={this.handlePass.bind(this)}>
          <i className="fa fa-check"> </i>
          Pass
        </button>
        <button onClick={this.handleReject.bind(this)}>
          <i className="fa fa-times"> </i>
          Reject
        </button>
      </div>
    );
  }
}

VotePhaseComponent.displayName = 'GameVotePhaseComponent';

// Uncomment properties you need
// VotePhaseComponent.propTypes = {};
// VotePhaseComponent.defaultProps = {};

export default VotePhaseComponent;
