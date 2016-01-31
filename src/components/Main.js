require('normalize.css');
require('styles/App.css');

import React, { Component, PropTypes } from 'react';
import UsersComponent from './UsersComponent';

let yeomanImage = require('../images/yeoman.png');

class AppComponent extends Component {
  render() {
    console.info(this.props);
    return (
      <div className="index">
        <img src={yeomanImage} alt="Yeoman Generator" />
        <div className="notice">There are {this.props.users.list.length} users.</div>
        <UsersComponent users={this.props.users.list}/>
      </div>
    );
  }
}

AppComponent.defaultProps = {
  users: PropTypes.array.isRequired
};

export default AppComponent;
