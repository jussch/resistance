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
      return (<div className="votephase-component"><h1>Voted</h1></div>);
    }

    const game = this.props.game;
    const candidates = _.filter(this.props.players, 'isCandidate');
    const failsNeeded = game.settings.fails[game.currentRound];
    return (
      <div className="votephase-component">
        The players up for the next mission: (sabotages needed for spy win: {failsNeeded})
        <PlayerListComponent players={candidates} />
        <button className="button" onClick={this.handlePass.bind(this)}>
          <div className="button-img">
            <i className="fa fa-check success-text"> </i>
          </div>
          Pass
        </button>
        <button className="button" onClick={this.handleReject.bind(this)}>
          <div className="button-img">
            <i className="fa fa-times fail-text"> </i>
          </div>
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
