import PropTypes from 'prop-types';
import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { ChevronDownIcon } from '@ui/components/icons';
import { BasicDropdownItem } from './items/BasicDropdownItem';
import style from './Dropdown.module.scss';

export function Dropdown({
  className,
  options,
  renderItem,
  leftIcon,
  arrowIcon,
  direction,
  hasOptionsArrow,
  placeholder,
  selected,
  width,
  disabled,
  readonly,
  onChange,
}) {
  const ref = useRef(null);
  const labelRef = useRef(null);
  const [labelFontSize, setLabelFontSize] = useState(30);

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

  const toggleOpen = () => {
    if (readonly) return;
    setOpen(!open);
  };

  const generateItemClick = (val, data) => () => {
    if (readonly) return;
    setOpen(false);
    setLabelFontSize(30);
    onChange(val, data);
  };

  // let fullOptions = [{ label: placeholder, value: '_none_' }]
  const fullOptions = options.map((option) =>
    option.label ? option : { label: option, value: option },
  );

  const currentOption = fullOptions.find((v) => v.value === selected);

  useEffect(() => {
    if (ref.current && labelRef.current) {
      if (labelRef.current.offsetHeight > ref.current.offsetHeight) {
        labelRef.current.style.visibility = 'hidden';
        setLabelFontSize(labelFontSize - 1);
      } else {
        labelRef.current.style.visibility = 'visible';
      }
    }
  }, [ref, labelRef, currentOption, labelFontSize]);

  // TODO: Switch over to same TYPE logic as Table config
  const items = fullOptions.map((option) => {
    const { value, label, data, renderItem: optionRenderItem } = option;

    if (typeof optionRenderItem === 'function') {
      return optionRenderItem({
        ...option,
        onClick: generateItemClick(value, data),
      });
    }

    if (typeof renderItem === 'function') {
      return renderItem({
        ...option,
        onClick: generateItemClick(value, data),
      });
    }

    return (
      <BasicDropdownItem
        onClick={generateItemClick(value, data)}
        key={`option-${value}`}
        label={label}
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
        <h5
          ref={labelRef}
          className={style.inputLabel}
          style={{ fontSize: labelFontSize, lineHeight: '1.1em' }}
        >
          {currentOption?.label || placeholder}
        </h5>
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
  placeholder: PropTypes.string,
  selected: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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
  placeholder: '',
  selected: '',
  width: null,
  disabled: false,
  readonly: false,
  onChange: () => {},
};
