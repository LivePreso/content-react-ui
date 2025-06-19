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
  placeholder,
  disabled,
  className,
  inputClassName,
}) {
  // Render the real tag instead that our EditText is trying to represent.
  if (readOnly || disabled) {
    const ReactTag = `${tagName}`;
    return (
      <ReactTag
        className={classNames(className, {
          [style.readonly]: readOnly,
          [style.disabled]: disabled,
        })}
      >
        {formatter?.(value) ?? value}
      </ReactTag>
    );
  }

  const baseClasses = classNames(className, style[tagName]);

  const extraProps = {};

  if (formatter) {
    extraProps.formatDisplayText = formatter;
  }

  return (
    <EditText
      type={type}
      value={value}
      className={classNames(baseClasses, style.edit)}
      inputClassName={classNames(baseClasses, inputClassName, style.input)}
      onChange={(e) => {
        onChange(e.target.value);
      }}
      placeholder={placeholder}
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
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
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
  placeholder: '',
  disabled: false,
  className: null,
  inputClassName: null,
};
