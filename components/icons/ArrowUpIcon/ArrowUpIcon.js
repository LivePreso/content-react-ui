import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import style from './ArrowUpIcon.module.scss';

export function ArrowUpIcon({ className, color }) {
  const classes = classNames(className, style.arrowUpIcon);

  return (
    <svg
      className={classes}
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 24 24"
      fill={color}
    >
      <path d="M20.5,15.8L12,7.3l-8.5,8.5L20.5,15.8z" />
    </svg>
  );
}

ArrowUpIcon.propTypes = {
  color: PropTypes.string,
  className: PropTypes.string,
};

ArrowUpIcon.defaultProps = {
  color: null,
  className: '',
};
