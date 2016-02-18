'use strict';

import React from 'react';

require('styles/users/ListItem.scss');

class ListItemComponent extends React.Component {
  render() {
    return (
      <li className="listitem-component">
        {this.props.user}
      </li>
    );
  }
}

ListItemComponent.displayName = 'UsersListItemComponent';

// Uncomment properties you need
// ListItemComponent.propTypes = {};
// ListItemComponent.defaultProps = {};

export default ListItemComponent;
