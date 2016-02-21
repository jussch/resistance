'use strict';

import React from 'react';
import _ from 'lodash';
import PlayerComponent from '../players/PlayerComponent';

require('styles/game/MissionReport.scss');

class MissionReportComponent extends React.Component {
  render() {
    const report = this.props.report;
    const team = _.map(report.players, (player, i) => {
      return <PlayerComponent player={{nickname: player}} key={i} />;
    });

    const times = report.sabotages == 1 ? 'time' : 'times';
    const winner = (
      <span className={report.winner === 'spies' ? 'spy-text' : 'res-text'}>
        {_.capitalize(report.winner)}
      </span>
    );

    return (
      <div className="missionreport-component">
        <h3>{winner} won the round.</h3>
        <div>These players went on a mission: {team}</div>
        <div>The mission was sabotaged {report.sabotages} {times} resulting in a {winner} point.</div>
      </div>
    );
  }
}

MissionReportComponent.displayName = 'GameMissionReportComponent';

// Uncomment properties you need
// MissionReportComponent.propTypes = {};
// MissionReportComponent.defaultProps = {};

export default MissionReportComponent;
