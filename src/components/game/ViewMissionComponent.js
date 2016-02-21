'use strict';

import React from 'react';
import _ from 'lodash';
import SuggestionReportComponent from './SuggestionReportComponent';
import MissionReportComponent from './MissionReportComponent';

require('styles/game/ViewMission.scss');

class ViewMissionComponent extends React.Component {
  render() {
    const mission = this.props.mission;

    let missionReport;
    if (mission.report.winner) {
      missionReport = <MissionReportComponent report={mission.report}/>
    } else {
      missionReport = <strong>This mission has not been completed.</strong>
    }

    let suggestions;
    if (mission.suggestedTeams.length) {
      suggestions = _.map(mission.suggestedTeams, (suggestion, k) => {
        return <MissionReportComponent suggestion={suggestion} key={k}/>
      });
    } else {
      suggestions = <strong>This mission has not had any suggested teams yet.</strong>
    }

    return (
      <div className="viewmission-component">
        <h1>Mission {mission.missionNumber}</h1>
        <h3>Report:</h3>
        {missionReport}
        <h3>Suggested Teams:</h3>
        {suggestions}
      </div>
    );
  }
}

ViewMissionComponent.displayName = 'GameViewMissionComponent';

// Uncomment properties you need
// ViewMissionComponent.propTypes = {};
// ViewMissionComponent.defaultProps = {};

export default ViewMissionComponent;
