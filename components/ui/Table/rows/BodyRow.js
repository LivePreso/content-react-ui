import React from 'react';
import { TableRow } from '../TableRow';
import { OrderableRow } from './OrderableRow';

export function BodyRow(props) {
  const {
    children = null,
    className = '',
    onReorder = null,
    // intercept this to stop it going to the DOM node
    toggleAccordion: _toggleAccordion,
    ...rowProps
  } = props;

  if (typeof onReorder === 'function') {
    return (
      <OrderableRow className={className} onReorder={onReorder} {...rowProps}>
        {children}
      </OrderableRow>
    );
  }

  return (
    <TableRow className={className} {...rowProps}>
      {children}
    </TableRow>
  );
}

BodyRow.propTypes = {
  ...TableRow.propTypes,
};
