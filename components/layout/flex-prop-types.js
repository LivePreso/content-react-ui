import PropTypes from 'prop-types';

export const flexPropTypes = PropTypes.oneOfType([
  PropTypes.number,
  PropTypes.oneOf(['auto', 'none'])
]);
