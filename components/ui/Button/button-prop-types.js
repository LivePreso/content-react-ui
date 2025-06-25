import PropTypes from 'prop-types';

export const buttonPropTypes = {
  className: PropTypes.string,
  classNameLabel: PropTypes.string,
  classNameIcon: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  leftIcon: PropTypes.element,
  rightIcon: PropTypes.element,
  isPresoManagerInteractive: PropTypes.bool,
  disabled: PropTypes.bool,
  invertColors: PropTypes.bool,
  variant: PropTypes.oneOf(['primary', 'secondary', 'text']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

export const buttonDefaultProps = {
  className: '',
  classNameLabel: '',
  classNameIcon: '',
  label: '',
  type: 'button',
  leftIcon: null,
  rightIcon: null,
  isPresoManagerInteractive: false,
  disabled: false,
  invertColors: false,
  variant: 'primary',
  size: 'medium',
};
