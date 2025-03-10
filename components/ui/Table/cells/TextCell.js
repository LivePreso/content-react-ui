import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { TableCell } from '../TableCell';

export function TextCell(props) {
  const { value, formatter, color, className, valueClassName, ...cellProps } =
    props;

  const formattedValue = formatter ? formatter(value) : value;
  const colorClass = color ? color(value) : '';

  return (
    <TableCell className={classNames(className, colorClass)} {...cellProps}>
      <span className={classNames(valueClassName)}>{formattedValue}</span>
    </TableCell>
  );
}

TextCell.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  formatter: PropTypes.func,
  color: PropTypes.func,
  valueClassName: PropTypes.string,
  ...TableCell.propTypes,
};

TextCell.defaultProps = {
  value: null,
  formatter: null,
  color: null,
  valueClassName: null,
  ...TableCell.defaultProps,
};
