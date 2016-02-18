'use strict';

import React from 'react';

require('styles/game/Lobby.scss');

class LobbyComponent extends React.Component {
  render() {
    const {users, actions} = this.props;
    return (
      <div className="lobby-component">
        <h1>{users.room}</h1>
        Currently there are {users.list.length} users is this room.
      </div>
    );
  }
}

LobbyComponent.displayName = 'GameLobbyComponent';

// Uncomment properties you need
// LobbyComponent.propTypes = {};
// LobbyComponent.defaultProps = {};

export default LobbyComponent;
