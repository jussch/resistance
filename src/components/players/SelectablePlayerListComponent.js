'use strict';

import React from 'react';
import _ from 'lodash';
import SelectablePlayerListItemComponent from './SelectablePlayerListItemComponent'

require('styles/players/SelectablePlayerList.scss');

class SelectablePlayerListComponent extends React.Component {
  render() {
    return (
      <ul className="selectableplayerlist-component">
        {_.map(this.props.players, (p, k) => {
          return <SelectablePlayerListItemComponent
            player={p}
            onSelect={this.props.onSelect}
            key={k}
          />
        })}
      </ul>
    );
  }
}

SelectablePlayerListComponent.displayName = 'PlayersSelectablePlayerListComponent';

// Uncomment properties you need
// SelectablePlayerListComponent.propTypes = {};
// SelectablePlayerListComponent.defaultProps = {};

export default SelectablePlayerListComponent;
