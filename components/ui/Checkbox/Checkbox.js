import React, { useId, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Row } from '@ui/components/layout';
import { CheckMarkIcon } from '@ui/components/icons';
import style from './Checkbox.module.scss';

export function Checkbox({
  tabIndex,
  label,
  active,
  onChange,
  disabled,
  className,
  labelClassName,
  id,
  icon,
}) {
  const autoGeneratedId = useId();
  const [uiid] = useState(id || autoGeneratedId);

  const resolvedClassName = classNames(style.checkbox, className, {
    [style.isActive]: active,
    [style.isDisabled]: disabled,
  });

  const labelClasses = classNames(style.label, labelClassName);

  const handleChange = () => {
    onChange(!active);
  };

  return (
    <label htmlFor={uiid} className={resolvedClassName} tabIndex={tabIndex}>
      <input
        id={uiid}
        type="checkbox"
        onChange={handleChange}
        checked={active}
        disabled={disabled}
      />
      <Row align="center">
        <div className={style.box}>
          {icon && <div className={style.icon}>{icon}</div>}
        </div>
        {label && <div className={labelClasses}>{label}</div>}
      </Row>
    </label>
  );
}

Checkbox.propTypes = {
  tabIndex: PropTypes.number,
  label: PropTypes.string,
  active: PropTypes.bool,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  labelClassName: PropTypes.string,
  id: PropTypes.string,
  icon: PropTypes.element,
};

Checkbox.defaultProps = {
  tabIndex: null,
  label: '',
  active: false,
  onChange: () => {},
  disabled: false,
  className: '',
  labelClassName: '',
  id: undefined,
  icon: <CheckMarkIcon />,
};
