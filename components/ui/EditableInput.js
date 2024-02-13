import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { EditText } from 'react-edit-text';
import style from './EditableInput.module.scss';

export function EditableInput(props) {
  const { tagName, readOnly, value, onChange } = props;

  // Render the real tag instead that our EditText is trying to represent.
  if (readOnly) {
    const ReactTag = `${tagName}`;
    return <ReactTag className={style.readonly}>{value}</ReactTag>;
  }

  return (
    <EditText
      value={value}
      className={classnames(style.edit, style[tagName])}
      inputClassName={classnames(style.input, style[tagName])}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    />
  );
}

EditableInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool,
  tagName: PropTypes.oneOf(['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
};

EditableInput.defaultProps = {
  value: '',
  onChange: () => {},
  tagName: 'p',
  readOnly: false,
};
