import React from 'react';

import { EditableBase } from './EditableBase';

import { defaultProps, propTypes } from '../editable-base-prop-types';
import style from './EditableInput.module.scss';

export function EditableInput(props) {
  return (
    <EditableBase mode="text" className={style.editableInput} {...props} />
  );
}

EditableInput.propTypes = {
  ...propTypes,
};

EditableInput.defaultProps = {
  ...defaultProps,
};
