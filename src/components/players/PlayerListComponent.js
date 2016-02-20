'use strict';

import React from 'react';
import _ from 'lodash';
import PlayerListItemComponent from './PlayerListItemComponent';

require('styles/players/PlayerList.scss');

class PlayerListComponent extends React.Component {
  render() {
    const {players} = this.props;
    return (
      <ul className="playerlist-component">
        {_.map(players, (player, key) => (<PlayerListItemComponent player={player} key={key}/>))}
      </ul>
    );
  }
}

PlayerListComponent.displayName = 'PlayersPlayerListComponent';

// Uncomment properties you need
// PlayerListComponent.propTypes = {};
// PlayerListComponent.defaultProps = {};

export default PlayerListComponent;
