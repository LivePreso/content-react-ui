/* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/interactive-supports-focus, jsx-a11y/role-has-required-aria-props */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from './Modal.module.scss';

export function Modal({ children, className, onClose }) {
  const classes = classNames(className, style.modal);

  return (
    <div className={style.wrapper}>
      <div className={style.shroud} onClick={onClose} type="button" />
      <div className={classes}>{children}</div>
    </div>
  );
}

Modal.propTypes = {
  onClose: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
};

Modal.defaultProps = {
  onClose: () => {},
  children: null,
  className: '',
};
