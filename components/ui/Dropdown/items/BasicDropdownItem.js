import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { DropdownItem } from './DropdownItem';
import style from './BasicDropdownItem.module.scss';

export function BasicDropdownItem({
  labelClassName,
  label,
  ...dropdownItemProps
}) {
  return (
    <DropdownItem {...dropdownItemProps}>
      <p className={classNames(labelClassName, style.label)}>{label}</p>
    </DropdownItem>
  );
}

BasicDropdownItem.propTypes = {
  ...DropdownItem.propTypes,
  label: PropTypes.string,
};

BasicDropdownItem.defaultProps = {
  ...DropdownItem.defaultProps,
  label: '',
};
