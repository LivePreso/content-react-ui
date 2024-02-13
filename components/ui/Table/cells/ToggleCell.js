import { Toggle } from '@ui/components/ui';
import { Cell } from '@ui/components/ui/Table/Cell';
import React from 'react';

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
    <Cell {...cellProps}>
      <Toggle {...toggleProps} />
    </Cell>
  );
}

ToggleCell.propTypes = {
  ...Toggle.propTypes,
  ...Cell.propTypes,
};

ToggleCell.defaultProps = {
  ...Toggle.defaultProps,
  ...Cell.defaultProps,
};
