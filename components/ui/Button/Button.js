import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from './Button.module.scss';

export function Button(props) {
  const {
    className,
    classNameLabel,
    type,
    label,
    leftIcon,
    rightIcon,
    invertColors,
    variant,
    size,
    isPresoManagerInteractive,
    ...rest
  } = props;

  const resolvedClassName = classNames(
    style.button,
    style[variant],
    { [style.invertedColors]: invertColors },
    { [style[size]]: size },
    className,
  );

  const labelClasses = classNames(classNameLabel, style.label);

  const opts = {};

  if (isPresoManagerInteractive) {
    opts['data-companywide-interactive'] = true;
  }

  return (
    // We are intentionally wrapping the default html button here
    // and possible button types are kept in check by prop types
    // eslint-disable-next-line react/button-has-type
    <button {...rest} type={type} className={resolvedClassName} {...opts}>
      {leftIcon && <span className={style.leftIcon}>{leftIcon}</span>}
      <span className={labelClasses}>{label}</span>
      {rightIcon && <span className={style.rightIcon}>{rightIcon}</span>}
    </button>
  );
}

Button.propTypes = {
  className: PropTypes.string,
  classNameLabel: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  leftIcon: PropTypes.element,
  rightIcon: PropTypes.element,
  isPresoManagerInteractive: PropTypes.bool,
  disabled: PropTypes.bool,
  invertColors: PropTypes.bool,
  variant: PropTypes.oneOf(['primary', 'secondary', 'text']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

Button.defaultProps = {
  className: '',
  classNameLabel: '',
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
