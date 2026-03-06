import React from 'react';
import { EditableText } from '../../EditableText';
import { TableCell } from '../TableCell';

export function EditableTextCell({
  id,
  prepId = null,
  isPrep = false,
  isCompany = false,
  isReadOnly = false,
  tag = 'div',
  toolbar = [
    'format',
    'list',
    'style',
    'color',
    'superscript',
    'align',
    'removeformat',
  ],
  stopPropagation = false,
  children = null,
  ...cellProps
}) {
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
