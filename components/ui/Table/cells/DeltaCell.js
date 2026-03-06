import React from 'react';
import PropTypes from 'prop-types';
import { isNull, isUndefined } from 'lodash-es';
import { DeltaValue } from '../../../stats';
import { TableCell } from '../TableCell';

export function DeltaCell({
  cellClassName: className = null,
  className: innerClassName = null,
  primary = null,
  secondary = null,
  formatter: deltaFormat = (v) => v,
  color = () => 'color-text',
  rowSpan = 1,
  colSpan = 1,
  width = null,
}) {
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
