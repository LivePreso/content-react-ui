import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import style from './ArrowRightIcon.module.scss';

export function ArrowRightIcon({ className, color }) {
  const classes = classNames(className, style.arrowRightIcon);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      fill={color}
    >
      <path d="M8.2,20.5l8.5-8.5L8.2,3.5V20.5z" />
    </svg>
  );
}

ArrowRightIcon.propTypes = {
  color: PropTypes.string,
  className: PropTypes.string,
};

ArrowRightIcon.defaultProps = {
  color: null,
  className: '',
};
