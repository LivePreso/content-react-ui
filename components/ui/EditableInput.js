import React from 'react';

import classNames from 'classnames';
import PropTypes from 'prop-types';
import { EditText } from 'react-edit-text';

import style from './EditableInput.module.scss';

export function EditableInput({
  type,
  tagName,
  readOnly,
  value,
  onChange,
  formatter,
  className,
  inputClassName,
}) {
  // Render the real tag instead that our EditText is trying to represent.
  if (readOnly) {
    const ReactTag = `${tagName}`;
    return (
      <ReactTag className={classNames(style.readonly, className)}>
        {formatter?.(value) ?? value}
      </ReactTag>
    );
  }

  const extraProps = {};

  if (formatter) {
    extraProps.formatDisplayText = formatter;
  }

  return (
    <EditText
      type={type}
      value={value}
      className={classNames(style.edit, style[tagName], className)}
      inputClassName={classNames(
        style.input,
        style[tagName],
        className,
        inputClassName,
      )}
      onChange={(e) => {
        onChange(e.target.value);
      }}
      {...extraProps}
    />
  );
}

EditableInput.propTypes = {
  value: PropTypes.string,
  type: PropTypes.oneOf(['text', 'number']),
  onChange: PropTypes.func,
  readOnly: PropTypes.bool,
  tagName: PropTypes.oneOf(['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
  formatter: PropTypes.func,
  className: PropTypes.string,
  inputClassName: PropTypes.string,
};

EditableInput.defaultProps = {
  value: '',
  type: 'text',
  onChange: () => {},
  tagName: 'p',
  readOnly: false,
  formatter: null,
  className: null,
  inputClassName: null,
};
