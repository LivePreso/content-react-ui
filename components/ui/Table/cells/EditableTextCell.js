import { EditableText } from '@ui/components/ui';
import { Cell } from '@ui/components/ui/Table/Cell';
import React from 'react';

export function EditableTextCell(props) {
  const {
    id,
    prepId,
    isPrep,
    isCompany,
    isReadOnly,
    tag,
    toolbar,
    children,
    ...cellProps
  } = props;

  const { ...editableTextProps } = {
    id,
    prepId,
    isPrep,
    isCompany,
    isReadOnly,
    tag,
    toolbar,
  };

  return (
    <Cell {...cellProps}>
      <EditableText {...editableTextProps}>{children}</EditableText>
    </Cell>
  );
}

EditableTextCell.propTypes = {
  ...EditableText.propTypes,
  ...Cell.propTypes,
};

EditableTextCell.defaultProps = {
  ...EditableText.defaultProps,
  ...Cell.defaultProps,
};
