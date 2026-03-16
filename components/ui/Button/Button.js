import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from './Button.module.scss';
import { buttonPropTypes } from './button-prop-types';

export function Button({
  className = '',
  classNameLabel = '',
  classNameIcon = '',
  type = 'button',
  label = '',
  leftIcon = null,
  rightIcon = null,
  invertColors = false,
  variant = 'primary',
  size = 'medium',
  isPresoManagerInteractive = false,
  disabled = false,
  ...rest
}) {
  const resolvedClassName = classNames(
    style.button,
    style[variant],
    { [style.invertedColors]: invertColors },
    { [style[size]]: size },
    className,
  );

  const labelClasses = classNames(classNameLabel, style.label);

  const opts = {};

  if (disabled) {
    opts.disabled = true;
  }

  if (isPresoManagerInteractive) {
    opts['data-companywide-interactive'] = true;
  }

  return (
    // We are intentionally wrapping the default html button here
    // and possible button types are kept in check by prop types
    // eslint-disable-next-line react/button-has-type
    <button {...rest} type={type} className={resolvedClassName} {...opts}>
      {leftIcon && (
        <span className={classNames(classNameIcon, style.leftIcon)}>
          {leftIcon}
        </span>
      )}
      {label && <span className={labelClasses}>{label}</span>}
      {rightIcon && (
        <span className={classNames(classNameIcon, style.rightIcon)}>
          {rightIcon}
        </span>
      )}
    </button>
  );
}

Button.propTypes = {
  ...buttonPropTypes,
  onClick: PropTypes.func.isRequired,
};
