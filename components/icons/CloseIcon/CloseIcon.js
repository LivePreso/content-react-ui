import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import style from './CloseIcon.module.scss';

export function CloseIcon({ className, color }) {
  const classes = classNames(className, style.closeIcon);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      fill={color}
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
    </svg>
  );
}

CloseIcon.propTypes = {
  color: PropTypes.string,
  className: PropTypes.string,
};

CloseIcon.defaultProps = {
  color: null,
  className: '',
};
