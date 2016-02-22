'use strict';

import React from 'react';
import ListItemComponent from './ListItemComponent';

require('styles/users/List.scss');

class ListComponent extends React.Component {
  render() {
    const {list} = this.props;
    return (
      <div className="list-component">
        <h2 className="spy-text">Players in the Lobby</h2>
        <ul className="user-list">
          {list.map((user, key) => (<ListItemComponent user={user} key={key}/>))}
        </ul>
      </div>
    );
  }
}

ListComponent.displayName = 'UsersListComponent';

// Uncomment properties you need
// ListComponent.propTypes = {};
// ListComponent.defaultProps = {};

export default ListComponent;
