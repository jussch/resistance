'use strict';

import React from 'react';
import CountdownComponent from './CountdownComponent';
import StartComponent from './StartComponent';
import ErrorHandlerComponent from '../ErrorHandlerComponent';

require('styles/game/Lobby.scss');

class LobbyComponent extends React.Component {
  render() {
    const {users, game, actions} = this.props;

    let actionComp;
    if (game.starting) {
      actionComp = (<CountdownComponent game={game} actions={actions}/>);
    } else {
      actionComp = (<StartComponent game={game} actions={actions}/>);
    }

    return (
      <div className="lobby-component">
        <h1>[GAME]: {users.room}</h1>
        <ErrorHandlerComponent errors={this.props.errors}/>
        {actionComp}
      </div>
    );
  }
}

LobbyComponent.displayName = 'GameLobbyComponent';

// Uncomment properties you need
// LobbyComponent.propTypes = {};
// LobbyComponent.defaultProps = {};

export default LobbyComponent;
