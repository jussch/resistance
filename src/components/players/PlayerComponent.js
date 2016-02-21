'use strict';

import React from 'react';

require('styles/players/Player.scss');

class PlayerComponent extends React.Component {
  render() {
    const player = this.props.player;
    const icon = player.spy ? 'fa-user-secret' : 'fa-user';
    const iconClassName = `fa ${icon} player-icon`;
    return (
      <span className="player-component">
        <i className={iconClassName}/>
        <span className="player-name">{player.nickname}</span>
      </span>
    );
  }
}

PlayerComponent.displayName = 'PlayersPlayerComponent';

// Uncomment properties you need
// PlayerComponent.propTypes = {};
// PlayerComponent.defaultProps = {};

export default PlayerComponent;
