import React from 'react';

import classNames from 'classnames';

import {
  TYPE_CHECKBOX,
  TYPE_CONNECTOR,
  TYPE_DATE,
  TYPE_DROPDOWN,
  TYPE_EMPTY,
  TYPE_MONEY,
  TYPE_MULTI_SELECT,
  TYPE_NUMBER,
} from './constants';

import style from './FormField.module.scss';
import { FormPrefixSuffix } from './FormPrefixSuffix';
import { Flex, Row } from '../layout';
import { Checkbox, DatePicker, Dropdown, EditableInput } from '../ui';

export function FormField({
  id,
  type,
  value,
  disabled,
  config = {},
  onChange = () => {},
}) {
  const { className, formatter = (n) => n, valueType } = config;

  const key = `${id}-${type}`;

  // Exists for layout purposes
  if (type === TYPE_EMPTY) return <Flex flex={1} />;

  if (type === TYPE_CONNECTOR) {
    return <div className={style.connector} />;
  }

  if ([TYPE_DROPDOWN, TYPE_MULTI_SELECT].includes(type)) {
    const defaultValue = type === TYPE_MULTI_SELECT ? [] : null;

    return (
      <Flex key={key} flex={1} className="interactive">
        <Dropdown
          className={classNames(className, style.dropdown)}
          inputClassName={style.field}
          selected={value ?? defaultValue}
          options={config.options}
          isMultiSelect={type === TYPE_MULTI_SELECT}
          disabled={disabled}
          onChange={onChange}
        />
      </Flex>
    );
  }

  if (type === TYPE_CHECKBOX) {
    const { label } = config;

    return (
      <Flex key={key} flex={1} className="interactive">
        <Checkbox
          className={className}
          label={label}
          active={value ?? false}
          disabled={disabled}
          onChange={onChange}
        />
      </Flex>
    );
  }

  if (type === TYPE_DATE) {
    const handleChange = (newValue) => {
      const newDateString = [
        newValue.getYear(),
        newValue.getMonth(),
        newValue.getDate(),
      ].join('-');
      onChange(newDateString);
    };

    const dateValue = (value && new Date(value)) || null;

    return (
      <Row
        key={key}
        flex={1}
        align="center"
        className={classNames(style.wrapper, 'interactive')}
      >
        <DatePicker
          className={classNames(className, style.field)}
          iconClassName={style.datePickerIcon}
          value={dateValue}
          onChange={handleChange}
          disabled={disabled}
          maxDate={config.maxDate}
        />
      </Row>
    );
  }

  const { prefix, suffix } = config;

  const editableProps = {
    type: 'text',
  };

  if ([TYPE_NUMBER, TYPE_MONEY].includes(valueType)) {
    editableProps.type = 'number';
    // deck must pass in a formatter, like bigMoney or bigNumber etc, if it wants one
    editableProps.formatter = formatter;
  }

  return (
    <Row
      key={key}
      flex={1}
      align="center"
      className={classNames(style.wrapper, 'interactive')}
    >
      <FormPrefixSuffix className={style.prefix} value={prefix} />

      <Flex flex={1}>
        <EditableInput
          value={value?.toString() || ''}
          className={classNames(className, style.field)}
          onChange={onChange}
          disabled={disabled}
          {...editableProps}
        />
      </Flex>

      <FormPrefixSuffix className={style.suffix} value={suffix} />
    </Row>
  );
}
