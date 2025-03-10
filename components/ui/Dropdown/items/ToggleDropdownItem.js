import PropTypes from 'prop-types';
import React from 'react';
import { Row } from '../../../layout';
import { Toggle } from '../../Toggle';
import { DropdownItem } from './DropdownItem';
import styleBasic from './BasicDropdownItem.module.scss';

export function ToggleDropdownItem({
  label,
  onToggleChange,
  toggleActive,
  toggleLabel,
  ...dropdownItemProps
}) {
  return (
    <DropdownItem {...dropdownItemProps}>
      <Row gap="flex-between" align="center">
        <p className={styleBasic.label}>{label}</p>
        <div onClick={(e) => e.stopPropagation()}>
          <Toggle
            label={toggleLabel}
            active={toggleActive}
            onChange={onToggleChange}
            alignLabel="left"
          />
        </div>
      </Row>
    </DropdownItem>
  );
}

ToggleDropdownItem.propTypes = {
  ...DropdownItem.propTypes,
  label: PropTypes.string,
  onToggleChange: PropTypes.func,
  toggleLabel: PropTypes.string,
};

ToggleDropdownItem.defaultProps = {
  ...DropdownItem.defaultProps,
  label: '',
  onToggleChange: () => {},
  toggleLabel: null,
};
