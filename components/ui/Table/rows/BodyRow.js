import React from 'react';
import { TableRow } from '../TableRow';
import { OrderableRow } from './OrderableRow';

export function BodyRow(props) {
  const { children, className, isOrderable, onReorder, ...rowProps } = props;

  if (isOrderable) {
    return <OrderableRow {...props}>{children}</OrderableRow>;
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

BodyRow.defaultProps = {
  ...TableRow.defaultProps,
};
