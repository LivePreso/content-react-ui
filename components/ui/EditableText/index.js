import React from 'react';
import PropTypes from 'prop-types';
import { BLOCK_LEVEL_FORMATS, PROP_TYPES } from './constants';
import { EditableText as EditableTextBase } from './EditableText';
import { EditableTextReadonly } from './EditableTextReadonly';

export function EditableText({
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
  isReadOnly = false,
  ...props
}) {
  // Block-level formatting is restricted to 'div' tags
  const toolbarOptions =
    tag === 'div'
      ? toolbar
      : toolbar.filter((option) => BLOCK_LEVEL_FORMATS.indexOf(option) < 0);

  if (isReadOnly) {
    return (
      <EditableTextReadonly tag={tag} toolbar={toolbarOptions} {...props} />
    );
  }

  return <EditableTextBase tag={tag} toolbar={toolbarOptions} {...props} />;
}

EditableText.propTypes = {
  isReadOnly: PropTypes.bool,
  ...PROP_TYPES,
};
