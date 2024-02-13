import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { FlexGroup } from './FlexGroup';
import style from './Row.module.scss';

export function Row({ className, children, gap, ...props }) {
  const classes = classNames(className, style.row, style[`gap-${gap}`]);

  return (
    <FlexGroup className={classes} gap={gap} {...props}>
      {children}
    </FlexGroup>
  );
}

Row.propTypes = {
  ...FlexGroup.propTypes,
  /**
   * 'small', 'medium' & 'large': CSS variable px
   * 'flex-': flex spacing
   */
  gap: PropTypes.oneOf([
    'none',
    'small',
    'medium',
    'large',
    'flex-around',
    'flex-between',
    'flex-evenly',
  ]),
  /**
   * Note: 'justify' is ignored when using a 'flex-' gap
   */
  justify: PropTypes.oneOf(['start', 'end', 'center']),
};

Row.defaultProps = {
  ...FlexGroup.defaultProps,
  gap: null,
};
