import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from './ScrollableArea.module.scss';

export function ScrollableArea({ children, className }) {
  const classes = classNames(className, style.scrollableArea);

  return <div className={classes}>{children}</div>;
}

ScrollableArea.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

ScrollableArea.defaultProps = {
  children: null,
  className: '',
};
