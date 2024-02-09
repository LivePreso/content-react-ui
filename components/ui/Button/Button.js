import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from './Button.module.scss';

export function Button(props) {
  const {
    className,
    type,
    label,
    leftIcon,
    rightIcon,
    variant,
    isPresoManagerInteractive,
    ...rest
  } = props;

  const resolvedClassName = classNames(style.button, style[variant], className);

  const opts = {};

  if (isPresoManagerInteractive) {
    opts['data-companywide-interactive'] = isPresoManagerInteractive;
  }

  return (
    // We are intentionally wrapping the default html button here
    // and possible button types are kept in check by prop types
    // eslint-disable-next-line react/button-has-type
    <button {...rest} type={type} className={resolvedClassName} {...opts}>
      {leftIcon && <span className={style.leftIcon}>{leftIcon}</span>}
      <span className={style.label}>{label}</span>
      {rightIcon && <span className={style.rightIcon}>{rightIcon}</span>}
    </button>
  );
}

Button.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  leftIcon: PropTypes.element,
  rightIcon: PropTypes.element,
  isPresoManagerInteractive: PropTypes.bool,
  disabled: PropTypes.bool,
  variant: PropTypes.oneOf(['primary', 'secondary', 'text'])
};

Button.defaultProps = {
  className: '',
  label: '',
  type: 'button',
  leftIcon: null,
  rightIcon: null,
  isPresoManagerInteractive: false,
  disabled: false,
  variant: 'primary'
};
