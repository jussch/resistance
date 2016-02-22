'use strict';

import React from 'react';
import ErrorHandlerComponent from './ErrorHandlerComponent';

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
    const inputSettings = {
      type: 'text',
      maxLength: 12,
      style: { textTransform: 'uppercase' },
      autoComplete: false,
      autoCapitalize: false,
      spellCheck: false,
      autoCorrect: false,
      disabled: !!users.requestRoom,
    };

    const roomVal = users.lastAccessed.room || '';
    const nickVal = users.lastAccessed.nickname || '';

    return (
      <div className="users-component">
        <h1 className="res-color">I AM NOT A SPY - The Game</h1>
        <h2>Join a room</h2>
        <ErrorHandlerComponent errors={this.props.errors}/>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group">
            <span className="form-group-addon">
              <i className="fa fa-user fa-fw"/>
            </span>
            <input id="nickname" {...inputSettings} placeholder="Nickname" defaultValue={nickVal}/>
          </div>

          <div className="form-group">
            <span className="form-group-addon">
              <i className="fa fa-users fa-fw"/>
            </span>
            <input id="room" {...inputSettings} placeholder="Room Name" defaultValue={roomVal}/>
          </div>

          <button className="button" role="submit" disabled={!!users.requestRoom}>Enter Game</button>
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
