import React from 'react';
import { Toggle } from '../../Toggle/Toggle';
import { TableCell } from '../TableCell';
import { CheckMarkIcon } from '../../../icons';

export function ToggleCell({
  tabIndex = null,
  label = null,
  active = false,
  onChange = () => {},
  disabled = false,
  id = undefined,
  icon = <CheckMarkIcon />,
  ...cellProps
}) {
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
