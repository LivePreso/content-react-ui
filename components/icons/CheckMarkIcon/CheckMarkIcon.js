import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import style from './CheckMarkIcon.module.scss';

export function CheckMarkIcon({ className, color }) {
  const classes = classNames(className, style.checkMarkIcon);

  return (
    <svg
      className={classes}
      width="12"
      height="13"
      viewBox="0 0 12 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="check">
        <path
          id="Shape"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.7269 2.52953L11.2741 3.04249C11.3748 3.13692 11.3799 3.29513 11.2855 3.39586L5.20646 9.88014C4.98107 10.1205 4.61172 10.1423 4.36049 9.94114L4.30856 9.89462L0.735333 6.3214C0.637702 6.22376 0.637702 6.06547 0.735333 5.96784L1.26566 5.43751C1.35244 5.35072 1.48715 5.34108 1.58459 5.40858L1.61921 5.43752L4.736 8.55451L10.3736 2.54093C10.4575 2.4514 10.5918 2.43741 10.6914 2.50173L10.7269 2.52953Z"
          fill={color}
        />
      </g>
    </svg>
  );
}

CheckMarkIcon.propTypes = {
  color: PropTypes.string,
  className: PropTypes.string
};

CheckMarkIcon.defaultProps = {
  color: null,
  className: ''
};
