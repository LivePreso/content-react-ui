import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { flexPropTypes } from './flex-prop-types';

export function Flex({ className, flex, width, height, children }) {
  const classes = classNames(className);

  return (
    <div className={classes} style={{ flex, width, height }}>
      {children}
    </div>
  );
}

Flex.propTypes = {
  flex: flexPropTypes,
  className: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  children: PropTypes.node,
};

Flex.defaultProps = {
  flex: 1,
  className: '',
  width: null,
  height: null,
  children: null,
};
