import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import style from './FlexGroup.module.scss';
import { flexPropTypes } from './flex-prop-types';

export function FlexGroup({
  flex,
  width,
  height,
  className,
  children,
  align,
  gap,
  justify,
}) {
  const classes = classNames(
    className,
    style.flexGroup,
    style[`align-${align}`],
    // Do not apply justify class if supplied gap is a flex option
    { [style[`justify-${justify}`]]: !gap || !gap.includes('flex-') },
  );

  return (
    <div className={classes} style={{ flex, width, height }}>
      {children}
    </div>
  );
}

FlexGroup.propTypes = {
  flex: flexPropTypes,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  align: PropTypes.oneOf(['stretch', 'start', 'end', 'center']),
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
  children: PropTypes.node,
  className: PropTypes.string,
};

FlexGroup.defaultProps = {
  flex: 'none',
  width: null,
  height: null,
  align: 'stretch',
  gap: null,
  justify: 'start',
  children: null,
  className: '',
};
