import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getDataProps } from '../../utils';
import { EMPTY_ACCORDION_KEY } from './table-constants';
import style from './Table.module.scss';

export function TableRow({ children, className, onClick, ...props }) {
  const compiledClasses = classNames(style.table, className);
  const dataAttrs = getDataProps(props);

  // For PDF table pagination to work, all rows, whether they are accordions
  // or not, require the data attribute data-accordion-parent to be included.
  // See Table.js: EMPTY_ACCORDION_KEY is added to the colSpan fixing "empty" row
  if (dataAttrs['data-accordion-header'] !== EMPTY_ACCORDION_KEY) {
    if (!dataAttrs['data-accordion-parent']) {
      dataAttrs['data-accordion-parent'] = EMPTY_ACCORDION_KEY;
    } else {
      dataAttrs['data-accordion-parent'] += ` ${EMPTY_ACCORDION_KEY}`;
    }
  }

  return (
    <tr {...dataAttrs} className={compiledClasses} onClick={onClick}>
      {children}
    </tr>
  );
}

TableRow.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
};

TableRow.defaultProps = {
  onClick: () => {},
  children: null,
  className: '',
};
