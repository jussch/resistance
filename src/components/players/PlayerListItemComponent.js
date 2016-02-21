'use strict';

import React from 'react';
import PlayerComponent from './PlayerComponent';

require('styles/players/PlayerListItem.scss');

class PlayerListItemComponent extends React.Component {
  render() {
    const {player, isCurrent} = this.props;
    const className = `playerlistitem-component ${player.isLeader ? 'leader-text' : ''}`;
    const wasLeaderIcon = `fa fa-${player.wasLeader ? 'times-' : ''}circle-o`;
    return (
      <li className={className}>
        <span className="wasleader-icon"><i className={wasLeaderIcon}/></span>
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
