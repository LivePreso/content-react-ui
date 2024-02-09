import { EditableText } from '@deck/components/ui';
import { Cell } from '@deck/components/ui/Table';
import React from 'react';

export function EditableTextCell(props) {
  const {
    id,
    isPrep,
    isCompany,
    isReadOnly,
    tag,
    label,
    toolbar,
    children,
    ...cellProps
  } = props;

  const { ...editableTextProps } = {
    id,
    isPrep,
    isCompany,
    isReadOnly,
    tag,
    label,
    toolbar
  };

  return (
    <Cell {...cellProps}>
      <EditableText {...editableTextProps}>{children}</EditableText>
    </Cell>
  );
}

EditableTextCell.propTypes = {
  ...EditableText.propTypes,
  ...Cell.propTypes
};

EditableTextCell.defaultProps = {
  ...EditableText.defaultProps,
  ...Cell.defaultProps
};
