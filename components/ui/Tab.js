import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ManagedTextField } from '@livepreso/react-plugin-textfield';
import { SIMPLE_TOOLBAR_CONFIG } from '@livepreso/react-plugin-textfield/constants';
import { useTargetKey } from '@livepreso/content-react';
import { slugify } from '../../utils/data-formatting';
import style from './Tab.module.scss';

const toSlug = slugify();

export function Tab({
  className = '',
  labelClassName = '',
  index,
  label = '',
  value,
  onClick = () => {},
  active,
  disabled = false,
  isPrep = false,
  isCompany = false,
  tokens = [],
  children = null,
}) {
  const id = `tab-${toSlug(value)}`;
  // Composed here rather than declared: the id is slugified from a value at
  // render time, so no declaration could name the key it produces.
  const targetKey = useTargetKey();
  const cwePrefixedKey = `${targetKey}-${id}`;
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
        <ManagedTextField
          id={cwePrefixedKey}
          className={labelClasses}
          isPrep={isPrep}
          isCompany={isCompany}
          tag="h5"
          tokens={tokens}
          toolbarConfig={SIMPLE_TOOLBAR_CONFIG}
        >
          {label}
        </ManagedTextField>
      ) : (
        <h5 className={labelClasses}>{label}</h5>
      )}
      {children}
    </div>
  );
}

Tab.propTypes = {
  index: PropTypes.number.isRequired,
  label: PropTypes.node,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  labelClassName: PropTypes.string,
  isPrep: PropTypes.bool,
  isCompany: PropTypes.bool,
  children: PropTypes.node,
};
