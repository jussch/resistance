'use strict';

import React from 'react';
import _ from 'lodash';
import ErrorComponent from './ErrorComponent';

require('styles//ErrorHandler.scss');

class ErrorHandlerComponent extends React.Component {
  render() {
    return (
      <div className="errorhandler-component">
        {_.map(this.props.errors, err => <ErrorComponent error={err} key={err.id} />)}
      </div>
    );
  }
}

ErrorHandlerComponent.displayName = 'ErrorHandlerComponent';

// Uncomment properties you need
// ErrorHandlerComponent.propTypes = {};
// ErrorHandlerComponent.defaultProps = {};

export default ErrorHandlerComponent;
