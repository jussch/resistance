'use strict';

import React from 'react';
import _ from 'lodash';
import MissionDetailsListItemComponent from './MissionDetailsListItemComponent';

require('styles/game/MissionDetailsList.scss');

class MissionDetailsListComponent extends React.Component {
  viewMission(i) {
    return (e) => {
      e.preventDefault();
      this.props.actions.playerViewMission({ missionNumber: i });
    }
  }

  render() {
    const missions = this.props.game.missions;
    const currentRound = this.props.game.currentRound;
    return (
      <ol className="missiondetailslist-component">
        {_.map(missions, (mission, k) => {
          return <MissionDetailsListItemComponent
            mission={mission}
            key={k}
            isCurrent={currentRound === k}
            onClick={this.viewMission(k)}
          />
        })}
      </ol>
    );
  }
}

MissionDetailsListComponent.displayName = 'GameMissionDetailsListComponent';

// Uncomment properties you need
// MissionDetailsListComponent.propTypes = {};
// MissionDetailsListComponent.defaultProps = {};

export default MissionDetailsListComponent;
