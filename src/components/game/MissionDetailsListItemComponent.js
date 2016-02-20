'use strict';

import React from 'react';

require('styles/game/MissionDetailsListItem.scss');

class MissionDetailsListItemComponent extends React.Component {
  render() {
    const mission = this.props.mission;
    return (
      <li className="missiondetailslistitem-component">
        <div className="mission-data">RoundWinner: {mission.winner}</div>
        <div className="mission-data">Sabotages: {mission.sabotages} / 1(SS)</div>
      </li>
    );
  }
}

MissionDetailsListItemComponent.displayName = 'GameMissionDetailsListItemComponent';

// Uncomment properties you need
// MissionDetailsListItemComponent.propTypes = {};
// MissionDetailsListItemComponent.defaultProps = {};

export default MissionDetailsListItemComponent;
