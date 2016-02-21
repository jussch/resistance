'use strict';

import React from 'react';
import ListComponent from './users/ListComponent';
import PlayerListComponent from './players/PlayerListComponent';
import LobbyComponent from './game/LobbyComponent';
import InitialPhaseComponent from './game/InitialPhaseComponent';
import PickPhaseComponent from './game/PickPhaseComponent';
import VotePhaseComponent from './game/VotePhaseComponent';
import MissionPhaseComponent from './game/MissionPhaseComponent';
import EndPhaseComponent from './game/EndPhaseComponent';
import MissionDetailsListComponent from './game/MissionDetailsListComponent';

require('styles//Game.scss');

class GameComponent extends React.Component {
  render() {
    const {users, game, players, player} = this.props;

    let listComp;
    let missionDetails;
    if (!game.started) {
      listComp = <ListComponent list={users.list}/>;
    } else {
      listComp = <PlayerListComponent players={players} player={player}/>;
      missionDetails = <MissionDetailsListComponent {...this.props}/>;
    }

    let gameStateComp;
    if (game.phase === 'lobby') {
      gameStateComp = <LobbyComponent {...this.props}/>;
    } else if (game.phase === 'initial') {
      gameStateComp = <InitialPhaseComponent {...this.props}/>;
    } else if (game.phase === 'pick') {
      gameStateComp = <PickPhaseComponent {...this.props}/>;
    } else if (game.phase === 'vote') {
      gameStateComp = <VotePhaseComponent {...this.props}/>;
    } else if (game.phase === 'mission') {
      gameStateComp = <MissionPhaseComponent {...this.props}/>;
    } else if (game.phase === 'end') {
      gameStateComp = <EndPhaseComponent {...this.props}/>;
    }

    return (
      <div className="game-component">
        {listComp}
        {gameStateComp}
        {missionDetails}
      </div>
    );
  }
}

GameComponent.displayName = 'GameComponent';

// Uncomment properties you need
// GameComponent.propTypes = {};
// GameComponent.defaultProps = {};

export default GameComponent;
