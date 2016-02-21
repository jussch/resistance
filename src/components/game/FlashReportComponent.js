'use strict';

import React from 'react';
import _ from 'lodash';
import SuggestionReportComponent from './SuggestionReportComponent';
import MissionReportComponent from './MissionReportComponent';

require('styles/game/FlashReport.scss');

class FlashReportComponent extends React.Component {
  render() {
    const round = this.props.game.currentRound;
    const missions = this.props.game.missions;

    if (round === -1 || !missions.length || (round === 0 && !missions[0].suggestedTeams.length)) {
      return (<div className="flashreport-component"></div>);
    }

    let comp;
    if (missions[round].suggestedTeams.length) {
      const suggestion = _.last(missions[round].suggestedTeams);
      comp = <SuggestionReportComponent suggestion={suggestion}/>;
    } else {
      const report = missions[round - 1].report;
      comp = <MissionReportComponent report={report}/>;
    }

    return (
      <div className="flashreport-component">
        {comp}
      </div>
    );
  }
}

FlashReportComponent.displayName = 'GameFlashReportComponent';

// Uncomment properties you need
// FlashReportComponent.propTypes = {};
// FlashReportComponent.defaultProps = {};

export default FlashReportComponent;
