'use strict';

import React from 'react';
import PlayerComponent from '../players/PlayerComponent';
const _ = require('lodash');

require('styles/game/InitialPhase.scss');

class InitialPhaseComponent extends React.Component {
  handleClick(e) {
    e.preventDefault();
    this.props.actions.playerRequestReady();
  }
  render() {
    const {player, players} = this.props;

    if (player.ready) {
      return (<div className="initialphase-component"><h1>Ready</h1></div>);
    }

    let title;
    let affiliation;
    let teammatesString;
    if (player.spy) {
      title = <h1 className="spy-text">Spy</h1>;
      affiliation = 'spies';
      let teammates = _.chain(players)
        .filter(p => p.spy && p.nickname !== player.nickname)
        .map((p, key) => <PlayerComponent player={p} key={key}/>)
        .value();

      teammatesString = `Your teammate${teammates.length ? 's are' : ' is'} ${teammates}`;
    } else {
      title = <h1 className="res-text">Resistance</h1>;
      affiliation = 'resistance';
      teammatesString = 'You don\'t know who you teammates are';
    }

    return (
      <div className="initialphase-component">
        {title}
        You are apart of the {affiliation}. {teammatesString}.
        <button className="button" onClick={this.handleClick.bind(this)}>Got it.</button>
      </div>
    );
  }
}

InitialPhaseComponent.displayName = 'GameInitialPhaseComponent';

// Uncomment properties you need
// InitialPhaseComponent.propTypes = {};
// InitialPhaseComponent.defaultProps = {};

export default InitialPhaseComponent;
