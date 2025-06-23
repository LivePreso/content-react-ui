import React from 'react';

import { EditableBase } from './EditableBase';

import { defaultProps, propTypes } from '../editable-base-prop-types';
import style from './EditableTextArea.module.scss';

export function EditableTextArea(props) {
  return (
    <EditableBase
      mode="textarea"
      className={style.editableTextArea}
      {...props}
    />
  );
}

EditableTextArea.propTypes = {
  ...propTypes,
};

EditableTextArea.defaultProps = {
  ...defaultProps,
};
