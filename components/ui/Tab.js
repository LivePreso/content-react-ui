import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { slugify } from '../../utils/data-formatting';
import style from './Tab.module.scss';
import { EditableText } from './EditableText';

const toSlug = slugify();

export function Tab({
  className,
  labelClassName,
  index,
  label,
  value,
  onClick,
  active,
  disabled,
  isPrep,
  isCompany,
}) {
  const classes = classNames(className, style.tab, {
    [style.isActive]: active,
    [style.isDisabled]: disabled,
  });
  const labelClasses = classNames(labelClassName, style.label);

  return (
    <div
      className={classes}
      onClick={disabled ? () => {} : onClick}
      aria-label={label}
      tabIndex={index}
      role="tab"
    >
      {isPrep || isCompany ? (
        <EditableText
          id={`tab-${toSlug(value)}`}
          className={labelClasses}
          isPrep={isPrep}
          isCompany={isCompany}
          tag="h5"
        >
          {label}
        </EditableText>
      ) : (
        <h5 className={labelClasses}>{label}</h5>
      )}
    </div>
  );
}

Tab.propTypes = {
  index: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOf([PropTypes.string, PropTypes.number]).isRequired,
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  labelClassName: PropTypes.string,
  isPrep: PropTypes.bool,
  isCompany: PropTypes.bool,
};

Tab.defaultProps = {
  onClick: () => {},
  disabled: false,
  className: '',
  labelClassName: '',
  isPrep: false,
  isCompany: false,
};
