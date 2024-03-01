import React from 'react';
import PropTypes from 'prop-types';
import { Row } from '../layout';
import style from './LoadingSpinner.module.scss';

export function LoadingSpinner({ justify, align, width, height }) {
  return (
    <Row justify={justify} align={align} width={width} height={height}>
      <div className={style.loadingSpinner} />
    </Row>
  );
}

LoadingSpinner.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  align: PropTypes.oneOf(['stretch', 'start', 'end', 'center']),
  justify: PropTypes.oneOf(['start', 'end', 'center']),
};

LoadingSpinner.defaultProps = {
  width: '100%',
  height: '100%',
  align: 'center',
  justify: 'center',
};
