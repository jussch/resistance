'use strict';

import React from 'react';

require('styles/game/MissionPhase.scss');

class MissionPhaseComponent extends React.Component {
  handlePass(e) {
    e.preventDefault();
    this.props.actions.playerRequestCompleteMission({ success: true });
  }

  handleSabotage(e) {
    e.preventDefault();
    this.props.actions.playerRequestCompleteMission({ success: false });
  }

  render() {
    const player = this.props.player;
    if (!player.isOnMission) {
      return (<div className="missionphase-component">Waiting for the players on the mission</div>)
    }

    return (
      <div className="missionphase-component">
        <button className="button res-text" onClick={this.handlePass.bind(this)}>
          <h1><i className="fa fa-check fa-fw"/>Pass Mission</h1>
        </button>
        <button className="button spy-text" onClick={this.handleSabotage.bind(this)}>
          <h1><i className="fa fa-times fa-fw"/>Sabotage Mission</h1>
          <div className="disclaimer">
            (You only want to do this if you are a spy.)
          </div>
        </button>
      </div>
    );
  }
}

MissionPhaseComponent.displayName = 'GameMissionPhaseComponent';

// Uncomment properties you need
// MissionPhaseComponent.propTypes = {};
// MissionPhaseComponent.defaultProps = {};

export default MissionPhaseComponent;
