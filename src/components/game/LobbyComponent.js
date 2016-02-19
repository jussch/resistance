'use strict';

import React from 'react';
import CountdownComponent from './CountdownComponent';
import StartComponent from './StartComponent';

require('styles/game/Lobby.scss');

class LobbyComponent extends React.Component {
  handleLeave(e) {
    e.preventDefault();

    // Send False to indicate leaving
    this.props.actions.access({ room: false });
  }
  render() {
    const {users, game, actions} = this.props;
    const handleLeave = this.handleLeave.bind(this);

    let actionComp;
    if (game.starting) {
      actionComp = (<CountdownComponent game={game} actions={actions}/>);
    } else {
      actionComp = (<StartComponent game={game} actions={actions}/>);
    }

    return (
      <div className="lobby-component">
        <h1>{users.room}</h1>
        Currently there are {users.list.length} users is this room.
        <button onClick={handleLeave} disabled={game.starting}>Leave</button>
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
