import React from 'react';
import { Toggle } from '../../Toggle/Toggle';
import { TableCell } from '../TableCell';

export function ToggleCell(props) {
  const {
    tabIndex,
    label,
    active,
    onChange,
    disabled,
    id,
    icon,
    ...cellProps
  } = props;

  const { ...toggleProps } = {
    tabIndex,
    label,
    active,
    onChange,
    disabled,
    id,
    icon,
  };

  return (
    <TableCell {...cellProps}>
      <Toggle {...toggleProps} />
    </TableCell>
  );
}

ToggleCell.propTypes = {
  ...Toggle.propTypes,
  ...TableCell.propTypes,
};

ToggleCell.defaultProps = {
  ...Toggle.defaultProps,
  ...TableCell.defaultProps,
};
