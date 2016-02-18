'use strict';

import React from 'react';
import LobbyComponent from './game/LobbyComponent';

require('styles//Game.scss');

class GameComponent extends React.Component {
  render() {
    const {users, actions} = this.props;
    return (
      <div className="game-component">
        <LobbyComponent users={users} actions={actions}/>
      </div>
    );
  }
}

GameComponent.displayName = 'GameComponent';

// Uncomment properties you need
// GameComponent.propTypes = {};
// GameComponent.defaultProps = {};

export default GameComponent;
