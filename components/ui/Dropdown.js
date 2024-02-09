/* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/interactive-supports-focus, jsx-a11y/role-has-required-aria-props */

import PropTypes from 'prop-types';
import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { ChevronDownIcon } from '@deck/components/icons';
import { DropdownItem } from './DropdownItem';
import style from './Dropdown.module.scss';

export function Dropdown({
  className,
  options,
  renderItem,
  icon,
  direction,
  hasOptionsArrow,
  placeholder,
  selected,
  width,
  disabled,
  readonly,
  onChange
}) {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);

  const classes = classNames(style.dropdown, 'no-screenshot', className);

  useEffect(() => {
    const handleClickOutside = event => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside, true);

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [ref, setOpen]);

  const toggleOpen = () => {
    setOpen(!open);
  };

  const generateItemClick = val => () => {
    setOpen(false);
    onChange(val);
  };

  // let fullOptions = [{ label: placeholder, value: '_none_' }]
  const fullOptions = options.map(option =>
    option.label ? option : { label: option, value: option }
  );

  const currentOption = fullOptions.find(v => v.value === selected);

  const items = fullOptions.map(option => {
    if (typeof renderItem === 'function') {
      return renderItem({
        ...option,
        onClick: generateItemClick(option.value)
      });
    }

    return (
      <DropdownItem
        onClick={generateItemClick(option.value)}
        key={`option-${option.value}`}
        label={option.label}
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
        {icon && <div className={style.inputIcon}>{icon}</div>}
        <h5 className={style.inputLabel}>
          {currentOption?.label || placeholder}
        </h5>
        <ChevronDownIcon />
      </div>
      <div
        className={classNames(style.options, {
          [style.open]: open,
          [style.disabled]: disabled,
          [style.readonly]: readonly,
          [style[`direction-${direction}`]]: direction,
          [style.hasOptionsArrow]: hasOptionsArrow
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
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    })
  ),
  renderItem: PropTypes.func,
  icon: PropTypes.node,
  direction: PropTypes.oneOf(['bottom', 'top']),
  hasOptionsArrow: PropTypes.bool,
  placeholder: PropTypes.string,
  selected: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
  onChange: PropTypes.func
};

Dropdown.defaultProps = {
  className: '',
  options: [],
  renderItem: null,
  icon: null,
  direction: 'bottom',
  hasOptionsArrow: false,
  placeholder: '',
  selected: '',
  width: null,
  disabled: false,
  readonly: false,
  onChange: () => {}
};
