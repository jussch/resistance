'use strict';

import React from 'react';

require('styles//Users.scss');

class UsersComponent extends React.Component {
  handleSubmit(e) {
    e.preventDefault();

    const room = document.getElementById('room').value;
    const nickname = document.getElementById('nickname').value;
    if (this.props.users.requestRoom || !room || !nickname) return;

    this.props.actions.access({
      room: room.toUpperCase(),
      nickname: nickname.toUpperCase(),
    });
  }
  render() {
    const users = this.props.users;
    return (
      <div className="users-component">
        Join a room.
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label htmlFor="nickname">Nickname</label>
          <input type="text" id="nickname" name="nickname" maxLength="12" style={{textTransform: 'uppercase'}} disabled={!!users.requestRoom}/>
          <label htmlFor="room">Room</label>
          <input type="text" id="room" name="room" maxLength="6" style={{textTransform: 'uppercase'}} disabled={!!users.requestRoom}/>
          <button role="submit" disabled={!!users.requestRoom}>Enter Game</button>
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
