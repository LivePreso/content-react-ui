import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from './Modal.module.scss';

export function Modal({ children, className, onClose }) {
  const classes = classNames(className, style.modal);
  const shroudClasses = classNames(style.shroud, {
    [style.isClickable]: typeof onClose === 'function',
  });

  return (
    <div className={style.wrapper}>
      <div
        className={shroudClasses}
        onClick={typeof onClose === 'function' ? onClose : null}
        type="button"
      />
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
  onClose: null,
  children: null,
  className: '',
};
