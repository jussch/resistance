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

    return (
      <li className="missiondetailslistitem-component" onClick={this.props.onClick}>
        <div className={className}>
          <div className="mission-players-needed">{mission.playersNeeded}</div>
          <div className="mission-sabotages-needed">{mission.sabotagesNeeded}</div>
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
