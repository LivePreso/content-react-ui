import PropTypes from 'prop-types';

export const valuePropTypes = [
  PropTypes.string,
  PropTypes.number,
  PropTypes.bool,
];

export const optionsPropTypes = PropTypes.arrayOf(
  PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.oneOfType(valuePropTypes),
    renderItem: PropTypes.func,
  }),
);
