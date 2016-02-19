'use strict';

import React from 'react';
import LobbyComponent from './game/LobbyComponent';
import ListComponent from './users/ListComponent';

require('styles//Game.scss');

class GameComponent extends React.Component {
  render() {
    const {users, actions, game} = this.props;

    let gameStateComp;
    if (!game.started) {
      gameStateComp = <LobbyComponent users={users} actions={actions} game={game}/>
    } else {

    }

    return (
      <div className="game-component">
        <ListComponent list={users.list}/>
        {gameStateComp}
      </div>
    );
  }
}

GameComponent.displayName = 'GameComponent';

// Uncomment properties you need
// GameComponent.propTypes = {};
// GameComponent.defaultProps = {};

export default GameComponent;
