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
      missionReport = <div className="empty">This mission has not been completed.</div>
    }

    let suggestions;
    if (mission.suggestedTeams.length) {
      suggestions = _.map(mission.suggestedTeams, (suggestion, k) => {
        return <SuggestionReportComponent suggestion={suggestion} key={k}/>
      });
    } else {
      suggestions = <div className="empty">This mission has not had any suggested teams yet.</div>
    }

    return (
      <div className="viewmission-component">
        <h1>Mission {mission.missionNumber} Details</h1>
        <div className="res-text">Players needed: {mission.playersNeeded}</div>
        <div className="spy-text">Sabotages required for fail: {mission.sabotagesNeeded}</div>
        <h3 className="header">Report:</h3>
        {missionReport}
        <h3 className="header">Suggested Teams:</h3>
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
