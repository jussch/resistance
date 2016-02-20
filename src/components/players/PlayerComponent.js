'use strict';

import React from 'react';

require('styles/players/Player.scss');

class PlayerComponent extends React.Component {
  render() {
    return (
      <span className="player-component">
        <i className="fa fa-user"> </i>
        {this.props.player.nickname}
      </span>
    );
  }
}

PlayerComponent.displayName = 'PlayersPlayerComponent';

// Uncomment properties you need
// PlayerComponent.propTypes = {};
// PlayerComponent.defaultProps = {};

export default PlayerComponent;
