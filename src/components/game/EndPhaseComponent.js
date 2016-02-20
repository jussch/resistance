'use strict';

import React from 'react';
import _ from 'lodash';

require('styles/game/EndPhase.scss');

class EndPhaseComponent extends React.Component {
  handleRematch(e) {
    e.preventDefault();
    this.props.actions.requestRematch();
  }

  render() {
    return (
      <div className="endphase-component">
        {_.capitalize(this.props.game.winner)} win!
        <button onClick={this.handleRematch.bind(this)}>Rematch!</button>
      </div>
    );
  }
}

EndPhaseComponent.displayName = 'GameEndPhaseComponent';

// Uncomment properties you need
// EndPhaseComponent.propTypes = {};
// EndPhaseComponent.defaultProps = {};

export default EndPhaseComponent;
