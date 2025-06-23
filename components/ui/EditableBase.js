import React from 'react';

import classNames from 'classnames';
import PropTypes from 'prop-types';
import { EditText, EditTextarea } from 'react-edit-text';

import style from './EditableBase.module.scss';
import { defaultProps, propTypes } from '../editable-base-prop-types';

export function EditableBase({
  mode,
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

  const editTextProps = {
    value,
    className: classNames(baseClasses, style.editText),
    inputClassName: classNames(baseClasses, inputClassName, style.input),
    onChange: (e) => {
      onChange(e.target.value);
    },
    placeholder,
  };

  if (formatter) {
    editTextProps.formatDisplayText = formatter;
  }

  if (mode === 'textarea') {
    return <EditTextarea {...editTextProps} />;
  }

  return <EditText type={type} {...editTextProps} />;
}

EditableBase.propTypes = {
  mode: PropTypes.oneOf(['text', 'textarea']),
  ...propTypes,
};

EditableBase.defaultProps = {
  mode: 'text',
  ...defaultProps,
};
