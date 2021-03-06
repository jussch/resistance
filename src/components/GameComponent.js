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
import FlashReportComponent from './game/FlashReportComponent';
import ViewMissionComponent from './game/ViewMissionComponent';

require('styles//Game.scss');

class GameComponent extends React.Component {
  render() {
    const {users, game, players, player} = this.props;

    let listComp;
    let missionDetails;
    let missionReport;
    let viewMission;
    if (!game.started) {
      listComp = <ListComponent list={users.list}/>;
    } else {
      listComp = <PlayerListComponent players={players} player={player} phase={game.phase}/>;
      missionReport = <FlashReportComponent game={game}/>;
      missionDetails = <MissionDetailsListComponent {...this.props}/>;
      if (player.viewingMission != null) {
        viewMission = <ViewMissionComponent mission={game.missions[player.viewingMission]}/>
      }
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
        {missionReport}
        {gameStateComp}
        {missionDetails}
        {viewMission}
      </div>
    );
  }
}

GameComponent.displayName = 'GameComponent';

// Uncomment properties you need
// GameComponent.propTypes = {};
// GameComponent.defaultProps = {};

export default GameComponent;
