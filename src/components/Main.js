require('normalize.css');
require('styles/App.css');

import React, { Component } from 'react';
import UsersComponent from './UsersComponent';
import GameComponent from './GameComponent';

class AppComponent extends Component {
  render() {
    const {actions, users} = this.props;

    let mainComp;
    if (!this.props.users.room) {
      mainComp = <UsersComponent users={users} actions={actions}/>;
    } else {
      mainComp = <GameComponent users={users} actions={actions}/>;
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
