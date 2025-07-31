import React from 'react';

import classNames from 'classnames';

import { LAYOUT_HORIZONTAL, LAYOUT_VERTICAL } from './constants';

import style from './Form.module.scss';
import { FormField } from './FormField';
import { Column, Row } from '../layout';

export function Form({
  className,
  orientation = LAYOUT_VERTICAL,
  config = [],
  data = {},
  labelWidth = '200px',
  onChange = () => {},
  disabled = false,
}) {
  const wrapperElements = {
    [LAYOUT_VERTICAL]: Column,
    [LAYOUT_HORIZONTAL]: Row,
  };
  const Wrapper = wrapperElements[orientation];

  const labelStyle =
    orientation === LAYOUT_VERTICAL
      ? { width: labelWidth }
      : { marginRight: 'var(--space-sml)' };

  function handleInputChange(key, value) {
    onChange({ [key]: value });
  }

  return (
    <Wrapper
      gap={orientation === LAYOUT_VERTICAL ? 'x-small' : 'large'}
      className={className}
    >
      {config.map(({ label = null, inputs = [] }) => (
        <Row
          key={`${label} ${inputs.map(({ key }) => key).join(' ')}`}
          gap={orientation === LAYOUT_VERTICAL ? 'x-small' : 'x-small'}
          align="center"
          className={classNames({ [style.disabled]: disabled })}
        >
          {label && (
            <p className={style.label} style={labelStyle}>
              {label}
            </p>
          )}

          {inputs.map(
            (
              { key, type, isDisabled = () => false, config: fieldConfig = {} },
              idx,
            ) => {
              return (
                <FormField
                  key={key || `${type}_${idx}`}
                  id={key}
                  type={type}
                  value={data[key] ?? null}
                  onChange={(value) => handleInputChange(key, value)}
                  disabled={disabled || isDisabled(data)}
                  config={fieldConfig}
                />
              );
            },
          )}
        </Row>
      ))}
    </Wrapper>
  );
}
