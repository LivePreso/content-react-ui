import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from './Tab.module.scss';

export function Tab({
  className,
  labelClassName,
  index,
  label,
  onClick,
  active,
  disabled
}) {
  const classes = classNames(className, style.tab, {
    [style.isActive]: active,
    [style.isDisabled]: disabled
  });
  const labelClasses = classNames(labelClassName, style.label);

  return (
    <div
      className={classes}
      onClick={disabled ? () => {} : onClick}
      aria-label={label}
      tabIndex={index}
      role="tab"
    >
      <h5 className={labelClasses}>{label}</h5>
    </div>
  );
}

Tab.propTypes = {
  index: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  labelClassName: PropTypes.string
};

Tab.defaultProps = {
  onClick: () => {},
  disabled: false,
  className: '',
  labelClassName: ''
};
