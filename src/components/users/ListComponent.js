'use strict';

import React from 'react';
import ListItemComponent from './ListItemComponent';

require('styles/users/List.scss');

class ListComponent extends React.Component {
  render() {
    const {list} = this.props;
    return (
      <ul className="list-component">
        {list.map((user, key) => (<ListItemComponent user={user} key={key}/>))}
      </ul>
    );
  }
}

ListComponent.displayName = 'UsersListComponent';

// Uncomment properties you need
// ListComponent.propTypes = {};
// ListComponent.defaultProps = {};

export default ListComponent;
