import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import style from './ChevronDownIcon.module.scss';

export function ChevronDownIcon({ className, color }) {
  const classes = classNames(className, style.chevronDownIcon);

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
        d="M0.942084 4.44306C1.20786 4.17729 1.62775 4.15957 1.91408 4.38991L1.97328 4.44306L6.99935 9.46958L12.0254 4.44306C12.2912 4.17729 12.7111 4.15957 12.9974 4.38991L13.0566 4.44306C13.3224 4.70883 13.3401 5.12873 13.1098 5.41505L13.0566 5.47426L7.51495 11.0159C7.24917 11.2817 6.82928 11.2994 6.54296 11.0691L6.48375 11.0159L0.942084 5.47426C0.657326 5.1895 0.657326 4.72782 0.942084 4.44306Z"
        fill={color}
      />
    </svg>
  );
}

ChevronDownIcon.propTypes = {
  color: PropTypes.string,
  className: PropTypes.string,
};

ChevronDownIcon.defaultProps = {
  color: null,
  className: '',
};
