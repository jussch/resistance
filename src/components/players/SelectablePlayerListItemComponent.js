'use strict';

import React from 'react';
import PlayerComponent from './PlayerComponent';

require('styles/players/SelectablePlayerListItem.scss');

class SelectablePlayerListItemComponent extends React.Component {
  handleClick(e) {
    e.preventDefault();
    this.props.onSelect(this.props.player);
  }
  render() {
    const highlightClass = 'selectableplayerlistitem-component ' +
      (this.props.player.isSelected ? 'highlighted' : '');

    return (
      <li className={highlightClass} onClick={this.handleClick.bind(this)}>
        <PlayerComponent player={this.props.player}/>
      </li>
    );
  }
}

SelectablePlayerListItemComponent.displayName = 'PlayersSelectablePlayerListItemComponent';

// Uncomment properties you need
// SelectablePlayerListItemComponent.propTypes = {};
// SelectablePlayerListItemComponent.defaultProps = {};

export default SelectablePlayerListItemComponent;
