'use strict';

import React from 'react';
import _ from 'lodash';
import SelectablePlayerListItemComponent from './SelectablePlayerListItemComponent'

require('styles/players/SelectablePlayerList.scss');

class SelectablePlayerListComponent extends React.Component {
  render() {
    const players = _.sortBy(this.props.players, 'ord');
    return (
      <ol className="selectableplayerlist-component">
        {_.map(players, (p, k) => {
          return <SelectablePlayerListItemComponent
            player={p}
            onSelect={this.props.onSelect}
            key={k}
          />
        })}
      </ol>
    );
  }
}

SelectablePlayerListComponent.displayName = 'PlayersSelectablePlayerListComponent';

// Uncomment properties you need
// SelectablePlayerListComponent.propTypes = {};
// SelectablePlayerListComponent.defaultProps = {};

export default SelectablePlayerListComponent;
