import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import style from './Arrow.module.scss';

export function Arrow(props) {
  const { className, orientation, color } = props;
  return (
    <svg
      className={classNames(className, style.svg, style[orientation])}
      width="14"
      height="15"
      viewBox="0 0 14 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.40925 0.972811L7.47206 1.02827L13.4721 7.02827C13.7324 7.28862 13.7324 7.71073 13.4721 7.97108C13.2317 8.2114 12.8536 8.22989 12.5921 8.02654L12.5292 7.97108L7.66732 3.10967V13.4997C7.66732 13.8416 7.40996 14.1233 7.0784 14.1619L7.00065 14.1663C6.65876 14.1663 6.37698 13.909 6.33847 13.5774L6.33398 13.4997V3.10967L1.47206 7.97108C1.23173 8.2114 0.853579 8.22989 0.592051 8.02654L0.529247 7.97108C0.288924 7.73076 0.270438 7.3526 0.473787 7.09107L0.529247 7.02827L6.52925 1.02827C6.76957 0.787947 7.14772 0.769461 7.40925 0.972811Z"
        fill={`var(--${color})`}
      />
    </svg>
  );
}

Arrow.propTypes = {
  orientation: PropTypes.oneOf(['up', 'down', 'left', 'right']),
  color: PropTypes.string,
  className: PropTypes.string,
};
Arrow.defaultProps = {
  orientation: 'up',
  color: 'color-text',
  className: null,
};
