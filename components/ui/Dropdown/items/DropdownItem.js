import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';
import style from './DropdownItem.module.scss';

export function DropdownItem({ className, onClick, children }) {
  const classes = classNames(style.item, className);

  // TODO: give necessary role attributes etc. for accessibility ARIA
  return (
    <div role="option" className={classes} onClick={onClick}>
      {children}
    </div>
  );
}

DropdownItem.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.element,
};

DropdownItem.defaultProps = {
  className: '',
  onClick: () => {},
  children: null,
};
