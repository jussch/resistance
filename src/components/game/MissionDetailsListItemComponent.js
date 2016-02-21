'use strict';

import React from 'react';

require('styles/game/MissionDetailsListItem.scss');

class MissionDetailsListItemComponent extends React.Component {
  render() {
    const mission = this.props.mission;
    let className = 'mission-circle';
    if (mission.report.winner === 'spies') className += ' spy-back';
    if (mission.report.winner === 'resistance') className += ' res-back';
    if (this.props.isCurrent) className += ' is-current';

    let content;
    if (!this.props.isSelected) {
      content = [
        <div className="mission-players-needed">{mission.playersNeeded}</div>,
        <div className="mission-sabotages-needed">{mission.sabotagesNeeded}</div>
      ];
    } else {
      content = <div className="mission-selected-arrow">
        <i className="fa fa-arrow-down"/>
      </div>
    }

    return (
      <li className="missiondetailslistitem-component" onClick={this.props.onClick}>
        <div className={className}>
          {content}
        </div>
      </li>
    );
  }
}

MissionDetailsListItemComponent.displayName = 'GameMissionDetailsListItemComponent';

// Uncomment properties you need
// MissionDetailsListItemComponent.propTypes = {};
// MissionDetailsListItemComponent.defaultProps = {};

export default MissionDetailsListItemComponent;
