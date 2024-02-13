import React from 'react';
import PropTypes from 'prop-types';
import { isNull, isUndefined } from 'lodash-es';
import { Cell } from '@ui/components/ui/Table';
import { DeltaValue } from '@ui/components/stats';

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
    <Cell
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
    </Cell>
  );
}

DeltaCell.propTypes = {
  formatter: PropTypes.func,
  color: PropTypes.func,
  className: PropTypes.string,
  primary: PropTypes.number,
  secondary: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  ...Cell.propTypes,
};

DeltaCell.defaultProps = {
  formatter: (v) => v,
  color: () => 'color-text',
  className: null,
  primary: null,
  secondary: null,
  ...Cell.defaultProps,
};
