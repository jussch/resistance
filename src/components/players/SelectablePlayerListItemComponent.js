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
    const player = this.props.player;
    const checkBox = `fa fa-${player.isSelected ? 'check-' : ''}square-o fa-fw`;
    let className = 'selectableplayerlistitem-component';
    if (player.isSelected) className += ' highlighted';
    if (this.props.disabled) className += ' disabled';

    return (
      <li className={className} onClick={this.handleClick.bind(this)}>
        <span className="selected-box"><i className={checkBox}/></span>
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
