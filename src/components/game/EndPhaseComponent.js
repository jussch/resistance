'use strict';

import React from 'react';

require('styles/game/EndPhase.scss');

class EndPhaseComponent extends React.Component {
  handleRematch(e) {
    e.preventDefault();
    this.props.actions.requestRematch();
  }

  render() {
    const winner = this.props.game.winner;

    let winnerDisp;
    if (winner === 'spies') winnerDisp = <span className="spy-text">Spies</span>;
    if (winner === 'resistance') winnerDisp = <span className="res-text">Resistance</span>;

    return (
      <div className="endphase-component">
        <h1>{winnerDisp} win!</h1>
        <button className="button" onClick={this.handleRematch.bind(this)}>Rematch!</button>
      </div>
    );
  }
}

EndPhaseComponent.displayName = 'GameEndPhaseComponent';

// Uncomment properties you need
// EndPhaseComponent.propTypes = {};
// EndPhaseComponent.defaultProps = {};

export default EndPhaseComponent;
