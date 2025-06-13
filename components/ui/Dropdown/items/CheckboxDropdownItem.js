import PropTypes from 'prop-types';
import React from 'react';
import { Row } from '../../../layout';
import { Checkbox } from '../../Checkbox';
import { DropdownItem } from './DropdownItem';
import style from './BasicDropdownItem.module.scss';

export function CheckboxDropdownItem({
  label,
  active,
  disabled,
  onChange,
  ...dropdownItemProps
}) {
  const handleClick = () => {
    onChange(!active);
  };

  return (
    <DropdownItem
      {...dropdownItemProps}
      onClick={handleClick}
      disabled={disabled}
    >
      <Row gap="small" align="center" justify="start">
        <Checkbox
          active={active}
          className={style.checkbox}
          disabled={disabled}
        />
        <p className={style.label}>{label}</p>
      </Row>
    </DropdownItem>
  );
}

CheckboxDropdownItem.propTypes = {
  ...DropdownItem.propTypes,
  label: PropTypes.string,
};

CheckboxDropdownItem.defaultProps = {
  ...DropdownItem.defaultProps,
  label: '',
};
