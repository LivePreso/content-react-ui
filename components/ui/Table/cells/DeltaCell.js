import React from 'react';
import PropTypes from 'prop-types';
import { isNull, isUndefined } from 'lodash-es';
import { DeltaValue } from '@ui/components/stats';
import { TableCell } from '../TableCell';

export function DeltaCell(props) {
  const {
    cellClassName: className,
    className: innerClassName,
    primary,
    secondary,
    formatter: deltaFormat,
    color,
    rowSpan,
    colSpan,
    width,
  } = props;

  const secondaryValue =
    isNull(secondary) || isUndefined(secondary) ? null : `(${secondary})`;

  return (
    <TableCell
      className={className}
      rowSpan={rowSpan}
      colSpan={colSpan}
      width={width}
    >
      <DeltaValue
        primary={primary}
        className={innerClassName}
        secondary={secondaryValue}
        formatter={deltaFormat}
        color={color}
      />
    </TableCell>
  );
}

DeltaCell.propTypes = {
  formatter: PropTypes.func,
  color: PropTypes.func,
  className: PropTypes.string,
  primary: PropTypes.number,
  secondary: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  ...TableCell.propTypes,
};

DeltaCell.defaultProps = {
  formatter: (v) => v,
  color: () => 'color-text',
  className: null,
  primary: null,
  secondary: null,
  ...TableCell.defaultProps,
};
