import React from 'react';
import { EditableText } from '../../EditableText';
import { TableCell } from '../TableCell';

export function EditableTextCell(props) {
  const {
    id,
    prepId,
    isPrep,
    isCompany,
    isReadOnly,
    tag,
    toolbar,
    stopPropagation,
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
    stopPropagation,
  };

  return (
    <TableCell {...cellProps}>
      <EditableText {...editableTextProps}>{children}</EditableText>
    </TableCell>
  );
}

EditableTextCell.propTypes = {
  ...EditableText.propTypes,
  ...TableCell.propTypes,
};

EditableTextCell.defaultProps = {
  ...EditableText.defaultProps,
  ...TableCell.defaultProps,
};
