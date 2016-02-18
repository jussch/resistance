'use strict';

import React from 'react';

require('styles//Users.scss');

class UsersComponent extends React.Component {
  handleSubmit(e) {
    e.preventDefault();
    if (this.props.users.requestRoom) return;
    this.props.actions.access({
      room: document.getElementById('room').value
    });
  }
  render() {
    const users = this.props.users;
    return (
      <div className="users-component">
        Join a room.
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label htmlFor="room">Room</label>
          <input type="text" id="room" name="room" disabled={!!users.requestRoom}/>
        </form>
      </div>
    );
  }
}

UsersComponent.displayName = 'UsersComponent';

// Uncomment properties you need
// UsersComponent.propTypes = {};
// UsersComponent.defaultProps = {};

export default UsersComponent;
