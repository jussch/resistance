'use strict';

import React from 'react';
import _ from 'lodash';
import MissionDetailsListItemComponent from './MissionDetailsListItemComponent';

require('styles/game/MissionDetailsList.scss');

class MissionDetailsListComponent extends React.Component {
  render() {
    const missions = this.props.game.missions;
    return (
      <ol className="missiondetailslist-component">
        {_.map(missions, (mission, k) => {
          return <MissionDetailsListItemComponent mission={mission} key={k}/>
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
