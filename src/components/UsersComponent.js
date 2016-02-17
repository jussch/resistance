'use strict';

import React from 'react';

require('styles//Users.scss');

class UsersComponent extends React.Component {
  render() {
    const users = this.props.users;
    return (
      <div className="users-component">
        There are {users.list.length} users.
      </div>
    );
  }
}

UsersComponent.displayName = 'UsersComponent';

// Uncomment properties you need
// UsersComponent.propTypes = {};
// UsersComponent.defaultProps = {};

export default UsersComponent;
