import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from './Modal.module.scss';

export function Modal({ open, children, className }) {
  const classes = classNames(className, style.modal, {
    [style.isOpen]: open,
  });

  return <div className={classes}>{children}</div>;
}

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  // onClose: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
};

Modal.defaultProps = {
  // onClose: () => {},
  children: null,
  className: '',
};
