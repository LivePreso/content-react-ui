import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import style from './CalendarIcon.module.scss';

export function CalendarIcon({ className, color }) {
  const classes = classNames(className, style.calendarIcon);

  return (
    <svg
      className={classes}
      width="18"
      height="19"
      viewBox="0 0 18 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.7077 0.833008C12.0529 0.833008 12.3327 1.11283 12.3327 1.45801V4.58301C12.3327 4.81313 12.5192 4.99967 12.7493 4.99967C12.9539 4.99967 13.124 4.85228 13.1593 4.6579L13.166 4.58301V3.33301H15.666C16.5865 3.33301 17.3327 4.0792 17.3327 4.99967V16.6663C17.3327 17.5868 16.5865 18.333 15.666 18.333H2.33268C1.41221 18.333 0.666016 17.5868 0.666016 16.6663V4.99967C0.666016 4.0792 1.41221 3.33301 2.33268 3.33301H5.24935V1.45801C5.24935 1.11283 5.52917 0.833008 5.87435 0.833008C6.21953 0.833008 6.49935 1.11283 6.49935 1.45801V4.58301C6.49935 4.81313 6.6859 4.99967 6.91602 4.99967C7.12057 4.99967 7.29069 4.85228 7.32597 4.6579L7.33268 4.58301V3.33301H11.0827V1.45801C11.0827 1.11283 11.3625 0.833008 11.7077 0.833008ZM15.666 7.49967H2.33268V15.833C2.33268 16.2604 2.65438 16.6126 3.06883 16.6607L3.16602 16.6663H14.8327C15.26 16.6663 15.6123 16.3446 15.6604 15.9302L15.666 15.833V7.49967ZM13.166 9.16634V10.833H11.4993V9.16634H13.166ZM9.83268 9.16634V10.833H8.16602V9.16634H9.83268ZM6.49935 9.16634V10.833H4.83268V9.16634H6.49935Z"
        fill={color}
      />
    </svg>
  );
}

CalendarIcon.propTypes = {
  color: PropTypes.string,
  className: PropTypes.string
};

CalendarIcon.defaultProps = {
  color: null,
  className: ''
};
