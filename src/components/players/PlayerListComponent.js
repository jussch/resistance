'use strict';

import React from 'react';
import _ from 'lodash';
import PlayerListItemComponent from './PlayerListItemComponent';

require('styles/players/PlayerList.scss');

class PlayerListComponent extends React.Component {
  render() {
    const players = _.sortBy(this.props.players, 'ord');
    return (
      <ol className="playerlist-component">
        {_.map(players, (player, key) => (<PlayerListItemComponent player={player} key={key}/>))}
      </ol>
    );
  }
}

PlayerListComponent.displayName = 'PlayersPlayerListComponent';

// Uncomment properties you need
// PlayerListComponent.propTypes = {};
// PlayerListComponent.defaultProps = {};

export default PlayerListComponent;
