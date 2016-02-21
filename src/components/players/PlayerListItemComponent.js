'use strict';

import React from 'react';
import PlayerComponent from './PlayerComponent';

require('styles/players/PlayerListItem.scss');

class PlayerListItemComponent extends React.Component {
  render() {
    const {player, isCurrent, phase} = this.props;
    const className = `playerlistitem-component ${player.isLeader ? 'leader-text' : ''}`;

    let leftSide;
    if (phase === 'vote' || phase === 'pick') {
      const wasLeaderIcon = `fa fa-${player.wasLeader ? 'times-' : ''}circle-o`;
      leftSide = <span className="left-side"><i className={wasLeaderIcon}/></span>;
    }

    let rightSide;
    if (phase === 'vote') {
      const isReadyIcon = `fa fa-${player.voted ? 'check' : 'pencil'}-square-o`;
      rightSide = <span className="right-side"><i className={isReadyIcon}/></span>;
    } else if (phase === 'mission' && player.isCandidate) {
      const isFinishedIcon = `fa fa-${player.completedMission ? 'check' : 'pencil'}-square-o`;
      rightSide = <span className="right-side"><i className={isFinishedIcon}/></span>;
    }

    return (
      <li className={className}>
        {leftSide}
        {rightSide}
        <PlayerComponent player={player}/> {isCurrent ? '(You)' : ''}
      </li>
    );
  }
}

PlayerListItemComponent.displayName = 'PlayersPlayerListItemComponent';

// Uncomment properties you need
// PlayerListItemComponent.propTypes = {};
// PlayerListItemComponent.defaultProps = {};

export default PlayerListItemComponent;
