require('normalize.css');
require('font-awesome-sass-loader');
require('styles/utilities.scss');
require('styles/App.scss');

import React, { Component } from 'react';
import UsersComponent from './UsersComponent';
import GameComponent from './GameComponent';

class AppComponent extends Component {
  render() {
    const {actions, users, errors} = this.props;

    let mainComp;
    if (!this.props.users.room) {
      mainComp = <UsersComponent users={users} actions={actions} errors={errors}/>;
    } else {
      mainComp = <GameComponent {...this.props}/>;
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
