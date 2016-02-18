'use strict';

import React from 'react';

require('styles/game/Lobby.scss');

class LobbyComponent extends React.Component {
  handleLeave(e) {
    e.preventDefault();

    // Send False to indicate leaving
    this.props.actions.access({ room: false });
  }
  render() {
    const {users} = this.props;
    const handleLeave = this.handleLeave.bind(this);
    return (
      <div className="lobby-component">
        <h1>{users.room}</h1>
        Currently there are {users.list.length} users is this room.
        <button onClick={handleLeave}>Leave</button>
      </div>
    );
  }
}

LobbyComponent.displayName = 'GameLobbyComponent';

// Uncomment properties you need
// LobbyComponent.propTypes = {};
// LobbyComponent.defaultProps = {};

export default LobbyComponent;
