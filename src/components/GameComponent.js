'use strict';

import React from 'react';
import ListComponent from './users/ListComponent';
import PlayerListComponent from './players/PlayerListComponent';
import LobbyComponent from './game/LobbyComponent';
import InitialPhaseComponent from './game/InitialPhaseComponent';
import PickPhaseComponent from './game/PickPhaseComponent';

require('styles//Game.scss');

class GameComponent extends React.Component {
  render() {
    const {users, game, players} = this.props;

    let listComp;
    if (!game.started) {
      listComp = <ListComponent list={users.list}/>;
    } else {
      listComp = <PlayerListComponent players={players}/>
    }

    let gameStateComp;
    if (game.phase === 'lobby') {
      gameStateComp = <LobbyComponent {...this.props}/>;
    } else if (game.phase === 'initial') {
      gameStateComp = <InitialPhaseComponent {...this.props}/>
    } else if (game.phase === 'pick') {
      gameStateComp = <PickPhaseComponent {...this.props}/>
    }

    return (
      <div className="game-component">
        {listComp}
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
