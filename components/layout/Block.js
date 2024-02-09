import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from './Block.module.scss';
import { flexPropTypes } from './flex-prop-types';

export function Block({
  flex,
  width,
  height,
  maxHeight,
  hasBorder,
  hasMarginBottom,
  noPadding,
  className,
  children,
  isHidden
}) {
  const classes = classNames(style.block, className, {
    [style.hasBorder]: hasBorder,
    [style.hasMarginBottom]: hasMarginBottom,
    [style.noPadding]: noPadding,
    [style.isHidden]: isHidden
  });

  return (
    <div className={classes} style={{ flex, width, height, maxHeight }}>
      {children}
    </div>
  );
}

Block.propTypes = {
  flex: flexPropTypes,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  maxHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  hasBorder: PropTypes.bool,
  hasMarginBottom: PropTypes.bool,
  noPadding: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
  isHidden: PropTypes.bool
};

Block.defaultProps = {
  flex: 'none',
  width: 'auto',
  height: 'auto',
  maxHeight: null,
  hasBorder: false,
  hasMarginBottom: false,
  noPadding: false,
  className: '',
  children: null,
  isHidden: false
};

export function BlockTitle({ className, children }) {
  const classes = classNames(className, style.blockTitle);

  return <div className={classes}>{children}</div>;
}

BlockTitle.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

BlockTitle.defaultProps = {
  children: null,
  className: ''
};
