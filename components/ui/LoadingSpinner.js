import React from 'react';
import PropTypes from 'prop-types';
import style from './LoadingSpinner.module.scss';

export function LoadingSpinner({ width, height }) {
  return <div style={{ width, height }} className={style.loadingSpinner} />;
}

LoadingSpinner.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

LoadingSpinner.defaultProps = {
  width: '100%',
  height: '100%',
};
