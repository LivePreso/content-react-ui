import React from 'react';
import PropTypes from 'prop-types';
import { Cell } from '@deck/components/ui/Table';
import classNames from 'classnames';

export function TextCell(props) {
  const {
    value,
    formatter,
    color,
    className,
    valueClassName,
    ...cellProps
  } = props;

  const formattedValue = formatter ? formatter(value) : value;
  const colorClass = color ? color(value) : '';

  return (
    <Cell className={classNames(className, colorClass)} {...cellProps}>
      <span className={classNames(valueClassName)}>{formattedValue}</span>
    </Cell>
  );
}

TextCell.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  formatter: PropTypes.func,
  color: PropTypes.func,
  valueClassName: PropTypes.string,
  ...Cell.propTypes
};

TextCell.defaultProps = {
  value: 0,
  formatter: null,
  color: null,
  valueClassName: null,
  ...Cell.defaultProps
};
