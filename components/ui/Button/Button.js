import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from './Button.module.scss';
import { buttonPropTypes, buttonDefaultProps } from './button-prop-types';

export function Button(props) {
  const {
    className,
    classNameLabel,
    classNameIcon,
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
      {leftIcon && (
        <span className={classNames(classNameIcon, style.leftIcon)}>
          {leftIcon}
        </span>
      )}
      <span className={labelClasses}>{label}</span>
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

Button.defaultProps = {
  ...buttonDefaultProps,
};
