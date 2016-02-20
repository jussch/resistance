'use strict';

import React from 'react';
import PlayerComponent from './PlayerComponent';

require('styles/players/PlayerListItem.scss');

class PlayerListItemComponent extends React.Component {
  render() {
    const {player} = this.props;
    return (
      <li className="playerlistitem-component">
        <PlayerComponent player={player}/>
      </li>
    );
  }
}

PlayerListItemComponent.displayName = 'PlayersPlayerListItemComponent';

// Uncomment properties you need
// PlayerListItemComponent.propTypes = {};
// PlayerListItemComponent.defaultProps = {};

export default PlayerListItemComponent;
