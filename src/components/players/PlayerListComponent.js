'use strict';

import React from 'react';
import _ from 'lodash';
import PlayerListItemComponent from './PlayerListItemComponent';

require('styles/players/PlayerList.scss');

class PlayerListComponent extends React.Component {
  isCurrentPlayer(player) {
    const current = this.props.player;
    return current && current.nickname === player.nickname;
  }

  render() {
    const players = _.sortBy(this.props.players, 'ord');
    const phase = this.props.phase;
    return (
      <ol className="playerlist-component user-list">
        {_.map(players, (player, key) => {
          return <PlayerListItemComponent
            player={player}
            key={key}
            isCurrent={this.isCurrentPlayer(player)}
            phase={phase}
          />
        })}
      </ol>
    );
  }
}

PlayerListComponent.displayName = 'PlayersPlayerListComponent';

// Uncomment properties you need
// PlayerListComponent.propTypes = {};
// PlayerListComponent.defaultProps = {};

export default PlayerListComponent;
