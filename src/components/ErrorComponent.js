'use strict';

import React from 'react';

require('styles//Error.scss');

class ErrorComponent extends React.Component {
  render() {
    return (
      <div className="error-component">
        {this.props.error.message}
      </div>
    );
  }
}

ErrorComponent.displayName = 'ErrorComponent';

// Uncomment properties you need
// ErrorComponent.propTypes = {};
// ErrorComponent.defaultProps = {};

export default ErrorComponent;
