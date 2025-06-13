import PropTypes from 'prop-types';
import classNames from 'classnames';
import { isArray } from 'lodash-es';
import React, { useEffect, useRef, useState } from 'react';
import { ChevronDownIcon } from '../../icons';
import { BasicDropdownItem } from './items/BasicDropdownItem';
import { CheckboxDropdownItem } from './items/CheckboxDropdownItem';
import style from './Dropdown.module.scss';
import { MiddleEllipsisText } from '../../text/MiddleEllipsisText';

export function Dropdown({
  className,
  options,
  renderItem,
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
  const [open, setOpen] = useState(false);

  const classes = classNames(style.dropdown, className, {
    [style.readonly]: readonly,
  });

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

  // let fullOptions = [{ label: placeholder, value: '_none_' }]
  const fullOptions = options.map((option) =>
    option.label ? option : { label: option, value: option },
  );

  const toggleOpen = () => {
    if (readonly) return;
    setOpen(!open);
  };

  const generateItemClick =
    (val, data) =>
    (isActive = true) => {
      if (readonly) return;

      if (isMultiSelect) {
        const newSelected = isActive
          ? [...selected, val]
          : selected.filter((v) => v !== val);

        const newData = fullOptions.filter((v) =>
          newSelected.includes(v.value),
        );

        onChange(newSelected, newData);
      } else {
        setOpen(false);
        onChange(val, data);
      }
    };

  const getSelectedLabel = () => {
    if (!selected) return '';

    if (isMultiSelect) {
      return (
        fullOptions
          .filter((v) => selected.includes(v.value))
          .map((v) => v.label)
          .join(', ') || null
      );
    }

    return fullOptions.find((v) => v.value === selected)?.label || null;
  };

  const selectedLabel = getSelectedLabel();

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
    <div ref={ref} className={classes} style={{ width }}>
      <div
        role="button"
        className={classNames(style.input)}
        onClick={toggleOpen}
      >
        {leftIcon && <div className={style.inputIcon}>{leftIcon}</div>}

        {isMultiSelect ? (
          <h5 className={style.inputLabel}>{selectedLabel || placeholder}</h5>
        ) : (
          <MiddleEllipsisText className={style.inputLabel}>
            {selectedLabel || placeholder}
          </MiddleEllipsisText>
        )}

        {!readonly && (
          <div className={style.arrowIcon}>
            {arrowIcon || <ChevronDownIcon />}
          </div>
        )}
      </div>
      <div
        className={classNames(style.options, {
          [style.open]: open,
          [style.disabled]: disabled,
          [style.readonly]: readonly,
          [style[`direction-${direction}`]]: direction,
          [style.hasOptionsArrow]: hasOptionsArrow,
        })}
      >
        {items}
      </div>
    </div>
  );
}

Dropdown.propTypes = {
  className: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      renderItem: PropTypes.func,
    }),
  ),
  renderItem: PropTypes.func,
  leftIcon: PropTypes.node,
  arrowIcon: PropTypes.node,
  direction: PropTypes.oneOf(['bottom', 'top']),
  hasOptionsArrow: PropTypes.bool,
  isMultiSelect: PropTypes.bool,
  placeholder: PropTypes.string,
  /* if isMultiSelect = true, selected is expected to be an array */
  selected: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    ),
    PropTypes.string,
    PropTypes.number,
  ]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
  onChange: PropTypes.func,
};

Dropdown.defaultProps = {
  className: '',
  options: [],
  renderItem: null,
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
};
