const _ = require('lodash');
const getError = require('./getError');
const expireError = require('./expireError');
module.exports = function(parameter) {
  return (dispatch) => {
    const errorId = _.uniqueId('error_');
    dispatch(getError(_.extend({}, parameter, { id: errorId })));
    setTimeout(() => {
      dispatch(expireError({ id: errorId }));
    }, 2000)
  };
};
