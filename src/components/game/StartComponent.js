'use strict';

import React from 'react';

require('styles/game/Start.scss');

class StartComponent extends React.Component {
  handleStart(e) {
    e.preventDefault();
    this.props.actions.start();
  }

  handleLeave(e) {
    e.preventDefault();

    // Send False to indicate leaving
    this.props.actions.access({ room: false });
  }

  render() {
    return (
      <div className="start-component">
        <button className="button" onClick={this.handleStart.bind(this)}>
          Start
        </button>

        <button className="button" onClick={this.handleLeave.bind(this)}>
          Leave
        </button>
      </div>
    );
  }
}

StartComponent.displayName = 'GameStartComponent';

// Uncomment properties you need
// StartComponent.propTypes = {};
// StartComponent.defaultProps = {};

export default StartComponent;
