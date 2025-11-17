import PropTypes from 'prop-types';
import classNames from 'classnames';
import { isArray } from 'lodash-es';
import React, { useEffect, useRef, useState } from 'react';
import { Flex } from '../../layout';
import { ChevronDownIcon } from '../../icons';
import { BasicDropdownItem } from './items/BasicDropdownItem';
import { CheckboxDropdownItem } from './items/CheckboxDropdownItem';
import { valuePropTypes, optionsPropTypes } from './prop-types';
import style from './Dropdown.module.scss';
import { DropdownInputLabel } from './DropdownInputLabel';

export function Dropdown({
  className,
  inputClassName,
  optionsClassName,
  options,
  renderItem,
  renderLabel,
  leftIcon,
  arrowIcon,
  direction,
  hasOptionsArrow,
  isMultiSelect,
  placeholder,
  selected,
  width,
  disabled,
  readonly,
  onChange,
  isPresoManagerInteractive,
}) {
  if (selected) {
    if (isMultiSelect && !isArray(selected)) {
      throw new Error(
        'Selected value must be an array for multi-select dropdown',
      );
    } else if (!isMultiSelect && isArray(selected)) {
      throw new Error(
        'Must be a multi-select dropdown if you wish to provide an array for the selected value',
      );
    }
  }

  const ref = useRef(null);
  const optionsRef = useRef(null);
  const optionsStyle = useRef({});
  const [open, setOpen] = useState(false);

  const opts = {};
  if (isPresoManagerInteractive) {
    opts['data-companywide-interactive'] = true;
  }

  const classes = classNames(style.dropdown, className, {
    [style.readonly]: readonly,
    [style.disabled]: disabled,
  });

  useEffect(() => {
    if (open && optionsRef.current) {
      const optionsDimensions = optionsRef.current.getBoundingClientRect();

      optionsStyle.current.top = `${optionsDimensions.top}px`;
      optionsStyle.current.left = `${optionsDimensions.left}px`;
    }
  }, [optionsRef, open]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside, true);

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [ref, setOpen]);

  const fullOptions = options.map((option) =>
    option.label ? option : { label: option, value: option },
  );

  const toggleOpen = () => {
    if (readonly || disabled) return;
    setOpen(!open);
  };

  const generateItemClick =
    (val, data) =>
    (isActive = true) => {
      if (readonly) return;

      if (isMultiSelect) {
        const currSelected = selected || [];
        const newSelected = isActive
          ? [...currSelected, val]
          : currSelected.filter((v) => v !== val);

        const newData = fullOptions.filter((v) =>
          newSelected.includes(v.value),
        );

        onChange(newSelected, newData);
      } else {
        setOpen(false);
        onChange(val, data);
      }
    };

  const items = fullOptions.map((option) => {
    const { value, label, data, renderItem: optionRenderItem } = option;
    const onClick = generateItemClick(value, data);

    if (typeof optionRenderItem === 'function') {
      return optionRenderItem({
        ...option,
        onClick,
      });
    }

    if (typeof renderItem === 'function') {
      return renderItem({
        ...option,
        onClick,
      });
    }

    if (isMultiSelect) {
      return (
        <CheckboxDropdownItem
          key={`option-${value}`}
          label={label}
          onChange={onClick}
          active={selected?.includes(value) ?? false}
        />
      );
    }

    return (
      <BasicDropdownItem
        key={`option-${value}`}
        label={label}
        onClick={onClick}
      />
    );
  });

  return (
    <div ref={ref} className={classes} style={{ width }} {...opts}>
      <div
        role="button"
        className={classNames(inputClassName, style.input)}
        onClick={toggleOpen}
      >
        {leftIcon && <div className={style.inputIcon}>{leftIcon}</div>}

        <Flex flex={1}>
          <DropdownInputLabel
            isMultiSelect={isMultiSelect}
            selected={selected}
            options={fullOptions}
            placeholder={placeholder}
            renderLabel={renderLabel}
          />
        </Flex>

        {!readonly && (
          <div className={style.arrowIcon}>
            {arrowIcon || <ChevronDownIcon />}
          </div>
        )}
      </div>
      <div
        ref={optionsRef}
        className={classNames(style.optionsWrapper, {
          [style.open]: open,
          [style.disabled]: disabled,
          [style.readonly]: readonly,
          [style[`direction-${direction}`]]: direction,
        })}
      >
        <div
          style={{ ...optionsStyle.current }}
          className={classNames(style.options, optionsClassName, {
            [style.hasOptionsArrow]: hasOptionsArrow,
          })}
        >
          {items}
        </div>
      </div>
    </div>
  );
}

Dropdown.propTypes = {
  className: PropTypes.string,
  inputClassName: PropTypes.string,
  optionsClassName: PropTypes.string,
  options: optionsPropTypes,
  renderItem: PropTypes.func,
  renderLabel: PropTypes.func,
  leftIcon: PropTypes.node,
  arrowIcon: PropTypes.node,
  direction: PropTypes.oneOf(['bottom', 'top']),
  hasOptionsArrow: PropTypes.bool,
  isMultiSelect: PropTypes.bool,
  placeholder: PropTypes.string,
  /* if isMultiSelect = true, selected is expected to be an array */
  selected: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType(valuePropTypes)),
    ...valuePropTypes,
  ]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
  onChange: PropTypes.func,
  isPresoManagerInteractive: PropTypes.bool,
};

Dropdown.defaultProps = {
  className: '',
  inputClassName: null,
  optionsClassName: null,
  options: [],
  renderItem: null,
  renderLabel: null,
  leftIcon: null,
  arrowIcon: null,
  direction: 'bottom',
  hasOptionsArrow: false,
  isMultiSelect: false,
  placeholder: '',
  selected: null,
  width: null,
  disabled: false,
  readonly: false,
  onChange: () => {},
  isPresoManagerInteractive: false,
};
