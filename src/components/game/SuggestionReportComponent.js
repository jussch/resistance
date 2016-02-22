'use strict';

import React from 'react';
import _ from 'lodash';
import PlayerComponent from '../players/PlayerComponent';

require('styles/game/SuggestionReport.scss');

class SuggestionReportComponent extends React.Component {
  render() {
    const suggestion = this.props.suggestion;
    const team = _.map(suggestion.players, (player, i) => {
      return <PlayerComponent player={{nickname: player}} key={i} />;
    });

    const passed = _.map(suggestion.passes, (player, i) => {
      return <PlayerComponent player={{nickname: player}} key={i} />;
    });

    const rejected = _.map(suggestion.rejections, (player, i) => {
      return <PlayerComponent player={{nickname: player}} key={i} />;
    });

    const success = suggestion.passes.length >= suggestion.rejections.length;
    const successComp = (
      <span className={success ? 'success-text' : 'fail-text'}>
        {success ? 'Success' : 'Rejected'}
      </span>
    );

    return (
      <div className="suggestionreport-component">
        <h3>Suggestion {successComp}</h3>
        <span className="leader-text">
          <PlayerComponent player={{nickname: suggestion.leader}}/>
        </span> promoted <span className="player-component-list">{team}</span>
        <div className="success-text">Passed:
          <div className="player-component-list">{passed}</div>
        </div>
        <div className="fail-text player-component-list">Rejected:
          <div className="player-component-list">{rejected}</div>
        </div>
      </div>
    );
  }
}

SuggestionReportComponent.displayName = 'GameSuggestionReportComponent';

// Uncomment properties you need
// SuggestionReportComponent.propTypes = {};
// SuggestionReportComponent.defaultProps = {};

export default SuggestionReportComponent;
