'use strict';

import React from 'react';

require('styles/game/Start.scss');

class StartComponent extends React.Component {
  handleStart(e) {
    e.preventDefault();
    this.props.actions.start();
  }
  render() {
    return (
      <div className="start-component">
        <button onClick={this.handleStart.bind(this)}>Start</button>
      </div>
    );
  }
}

StartComponent.displayName = 'GameStartComponent';

// Uncomment properties you need
// StartComponent.propTypes = {};
// StartComponent.defaultProps = {};

export default StartComponent;
