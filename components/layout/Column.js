import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { FlexGroup } from './FlexGroup';
import style from './Column.module.scss';

export function Column({ className, children, gap, reverse, ...props }) {
  const classes = classNames(className, style.column, style[`gap-${gap}`], {
    [style.reverse]: reverse,
  });

  return (
    <FlexGroup className={classes} gap={gap} {...props}>
      {children}
    </FlexGroup>
  );
}

Column.propTypes = {
  ...FlexGroup.propTypes,
  /**
   * 'small', 'medium' & 'large': CSS variable px
   * 'flex-': flex spacing
   */
  gap: PropTypes.oneOf([
    'none',
    'x-small',
    'small',
    'medium',
    'large',
    'x-large',
    'flex-around',
    'flex-between',
    'flex-evenly',
  ]),
  /**
   * Note: 'justify' is ignored when using a 'flex-' gap
   */
  justify: PropTypes.oneOf(['start', 'end', 'center']),
  reverse: PropTypes.bool,
};

Column.defaultProps = {
  ...FlexGroup.defaultProps,
  gap: null,
  reverse: false,
};
