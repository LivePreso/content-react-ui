import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from './Table.module.scss';

export function Row({ children, className }) {
  const compiledClasses = classNames(style.table, className);

  return <tr className={compiledClasses}>{children}</tr>;
}

Row.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

Row.defaultProps = {
  children: null,
  className: '',
};
