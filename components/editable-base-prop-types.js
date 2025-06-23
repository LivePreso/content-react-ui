import PropTypes from 'prop-types';

export const propTypes = {
  value: PropTypes.string,
  type: PropTypes.oneOf(['text', 'number']),
  onChange: PropTypes.func,
  readOnly: PropTypes.bool,
  tagName: PropTypes.oneOf(['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
  formatter: PropTypes.func,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  inputClassName: PropTypes.string,
};

export const defaultProps = {
  value: '',
  type: 'text',
  onChange: () => {},
  tagName: 'p',
  readOnly: false,
  formatter: null,
  placeholder: '',
  disabled: false,
  className: null,
  inputClassName: null,
};
