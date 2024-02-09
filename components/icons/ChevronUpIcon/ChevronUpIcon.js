import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import style from './ChevronUpIcon.module.scss';

export function ChevronUpIcon({ className, color }) {
  const classes = classNames(className, style.chevronUpIcon);

  return (
    <svg
      className={classes}
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.9,9l5.5-5.5l0.1-0.1c0.3-0.2,0.7-0.2,1,0.1L13.1,9L13.1,9c0.2,0.3,0.2,0.7-0.1,1L13,10.1 c-0.3,0.2-0.7,0.2-1-0.1L7,5l-5,5l-0.1,0.1c-0.3,0.2-0.7,0.2-1-0.1C0.7,9.7,0.7,9.3,0.9,9z"
        fill={color}
      />
    </svg>
  );
}

ChevronUpIcon.propTypes = {
  color: PropTypes.string,
  className: PropTypes.string
};

ChevronUpIcon.defaultProps = {
  color: null,
  className: ''
};
