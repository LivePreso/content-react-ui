import React, { useId, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { CheckMarkIcon } from '../../icons';
import { Row } from '../../layout';
import style from './Toggle.module.scss';

export function Toggle({
  tabIndex,
  label,
  active,
  onChange,
  disabled,
  className,
  id,
  icon,
  alignLabel,
}) {
  const autoGeneratedId = useId();
  const [uiid] = useState(id || autoGeneratedId);

  const resolvedClassName = classNames(style.toggle, className, {
    [style.isActive]: active,
    [style.isDisabled]: disabled,
  });

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
      <Row align="center" reverse={alignLabel === 'left'}>
        <div className={style.track}>
          <div className={style.switch}>
            {icon && <div className={style.icon}>{icon}</div>}
          </div>
        </div>
        {label && (
          <div
            className={classNames(
              style.label,
              style[`label-align-${alignLabel}`],
            )}
          >
            {label}
          </div>
        )}
      </Row>
    </label>
  );
}

Toggle.propTypes = {
  tabIndex: PropTypes.number,
  label: PropTypes.node,
  active: PropTypes.bool,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  id: PropTypes.string,
  icon: PropTypes.element,
  alignLabel: PropTypes.oneOf(['left', 'right']),
};

Toggle.defaultProps = {
  tabIndex: null,
  label: null,
  active: false,
  onChange: () => {},
  disabled: false,
  className: '',
  id: undefined,
  icon: <CheckMarkIcon />,
  alignLabel: 'right',
};
