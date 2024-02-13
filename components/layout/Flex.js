import React from 'react';
import classNames from 'classnames';
import { flexPropTypes } from './flex-prop-types';

export function Flex({ className, flex, children }) {
  const classes = classNames(className);

  return (
    <div className={classes} style={{ flex }}>
      {children}
    </div>
  );
}

Flex.propTypes = {
  flex: flexPropTypes,
};

Flex.defaultProps = {
  flex: 1,
};
