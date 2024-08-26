import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from './ScrollableArea.module.scss';
import { flexPropTypes } from '../layout/flex-prop-types';

export function ScrollableArea({
  flex,
  width,
  height,
  isPresoManagerInteractive,
  children,
  className,
}) {
  const classes = classNames(className, style.scrollableArea);

  const opts = {};

  if (isPresoManagerInteractive) {
    opts['data-companywide-interactive'] = true;
  }

  return (
    <div className={classes} style={{ flex, width, height }} {...opts}>
      {children}
    </div>
  );
}

ScrollableArea.propTypes = {
  flex: flexPropTypes,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  isPresoManagerInteractive: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
};

ScrollableArea.defaultProps = {
  flex: 'none',
  width: null,
  height: null,
  isPresoManagerInteractive: false,
  children: null,
  className: '',
};
