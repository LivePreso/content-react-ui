import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { EMPTY_ACCORDION_KEY } from './table-constants';
import style from './Table.module.scss';

export function Row({
  children,
  className,
  onClick,
  accordionHeaderKey,
  accordionParentKeys,
}) {
  const compiledClasses = classNames(style.table, className);

  const opts = {};

  if (accordionHeaderKey) {
    opts['data-accordion-header'] = accordionHeaderKey;
  }

  if (
    accordionHeaderKey !== EMPTY_ACCORDION_KEY ||
    accordionParentKeys.length
  ) {
    opts['data-accordion-parent'] = [
      ...accordionParentKeys,
      EMPTY_ACCORDION_KEY,
    ].join(' ');
  }

  return (
    <tr {...opts} className={compiledClasses} onClick={onClick}>
      {children}
    </tr>
  );
}

Row.propTypes = {
  accordionHeaderKey: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  accordionParentKeys: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  ),
  onClick: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
};

Row.defaultProps = {
  accordionHeaderKey: null,
  accordionParentKeys: [],
  onClick: () => {},
  children: null,
  className: '',
};
