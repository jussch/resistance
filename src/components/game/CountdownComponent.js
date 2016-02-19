'use strict';

import React from 'react';

require('styles/game/Countdown.scss');

class CountdownComponent extends React.Component {
  handleCancel(e) {
    e.preventDefault();
    this.props.actions.cancel();
  }
  render() {
    const {game} = this.props;
    return (
      <div className="countdown-component">
        <strong className="countdown-number">{game.countDown}</strong>
        <button onClick={this.handleCancel.bind(this)}>Cancel</button>
      </div>
    );
  }
}

CountdownComponent.displayName = 'GameCountdownComponent';

// Uncomment properties you need
// CountdownComponent.propTypes = {};
// CountdownComponent.defaultProps = {};

export default CountdownComponent;
