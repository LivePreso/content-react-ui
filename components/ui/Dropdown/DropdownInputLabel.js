import React from 'react';
import PropTypes from 'prop-types';
import { MiddleEllipsisText } from '../../text/MiddleEllipsisText';
import style from './Dropdown.module.scss';
import { optionsPropTypes } from './prop-types';

export function DropdownInputLabel({
  selected,
  options,
  isMultiSelect,
  placeholder,
  renderLabel,
}) {
  const getLabel = () => {
    if (typeof selected === 'undefined') return '';

    if (isMultiSelect) {
      return (
        options
          .filter((v) => selected.includes(v.value))
          .map((v) => v.label)
          .join(', ') || null
      );
    }

    return options.find((v) => v.value === selected)?.label || null;
  };

  const label = getLabel();

  if (typeof renderLabel === 'function') {
    return renderLabel({ selected, label, isMultiSelect, placeholder });
  }

  return isMultiSelect ? (
    <h5 className={style.inputLabel}>{label || placeholder}</h5>
  ) : (
    <MiddleEllipsisText className={style.inputLabel}>
      {label || placeholder}
    </MiddleEllipsisText>
  );
}

DropdownInputLabel.propTypes = {
  selected: PropTypes.string,
  options: optionsPropTypes,
  isMultiSelect: PropTypes.bool,
  placeholder: PropTypes.string,
  renderLabel: PropTypes.func,
};

DropdownInputLabel.defaultProps = {
  selected: '',
  options: [],
  isMultiSelect: false,
  placeholder: '',
  renderLabel: null,
};
