import React from 'react';
import PropTypes from 'prop-types';
import { useTargetKey } from '@livepreso/content-react';
import {
  defineEditableSource,
  prop,
  resolveEditable,
} from '@livepreso/webpack-deck';
import { BLOCK_LEVEL_FORMATS, PROP_TYPES } from './constants';
import { EditableText as EditableTextBase } from './EditableText';
import { EditableTextReadonly } from './EditableTextReadonly';

const DEFAULT_TOOLBAR = [
  'format',
  'list',
  'style',
  'color',
  'superscript',
  'align',
  'removeformat',
];

// Decks import this one, so the declaration and the key resolution both live
// here. What it renders is handed the result rather than composing the key
// again.
export function EditableText(props) {
  const {
    tag = 'div',
    toolbar = DEFAULT_TOOLBAR,
    isReadOnly = false,
    ...rest
  } = props;

  // Block-level formatting is restricted to 'div' tags
  const toolbarOptions =
    tag === 'div'
      ? toolbar
      : toolbar.filter((option) => BLOCK_LEVEL_FORMATS.indexOf(option) < 0);

  const targetKey = useTargetKey();
  const { keys, attrs } = resolveEditable(
    editable,
    { ...props, toolbar: toolbarOptions },
    { targetKey },
  );

  if (isReadOnly) {
    return (
      <EditableTextReadonly
        tag={tag}
        toolbar={toolbarOptions}
        keys={keys}
        {...rest}
      />
    );
  }

  return (
    <EditableTextBase tag={tag} toolbar={toolbarOptions} attrs={attrs} {...rest} />
  );
}

EditableText.propTypes = {
  isReadOnly: PropTypes.bool,
  ...PROP_TYPES,
};

const editable = defineEditableSource(EditableText, {
  toolbar: prop('toolbar'),
  everyone: {
    when: prop('isCompany'),
    key: '{targetKey}-{id}',
    // isGlobal drops the target from the key, so every slide using the same id
    // resolves to one shared value.
    keyWhen: { isGlobal: '{id}' },
  },
  personal: {
    when: prop('isPrep'),
    id: prop('prepId'),
    key: '{targetKey}-{id}',
  },
});
