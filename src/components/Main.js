require('normalize.css');
require('font-awesome-sass-loader');
require('styles/utilities.scss');
require('styles/App.scss');

import React, { Component } from 'react';
import UsersComponent from './UsersComponent';
import GameComponent from './GameComponent';

class AppComponent extends Component {
  render() {
    const {actions, users, game, players, player} = this.props;

    let mainComp;
    if (!this.props.users.room) {
      mainComp = <UsersComponent users={users} actions={actions}/>;
    } else {
      mainComp = <GameComponent users={users} actions={actions} game={game} players={players} player={player}/>;
    }

    return (
      <div className="index">
        {mainComp}
      </div>
    );
  }
}

//AppComponent.defaultProps = {
//  users: PropTypes.array.isRequired
//};

export default AppComponent;
