import React from 'react';
import {
  defineEditableSource,
  prop,
} from '@livepreso/webpack-deck';
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

// The same arguments EditableText reads, under the same names, since this hands
// them straight down. isGlobal is not among them, leaving no branch here that
// drops the target.
defineEditableSource(EditableTextCell, {
  toolbar: prop('toolbar'),
  everyone: { when: prop('isCompany'), key: '{targetKey}-{id}' },
  personal: { when: prop('isPrep'), id: prop('prepId'), key: '{targetKey}-{id}' },
});
