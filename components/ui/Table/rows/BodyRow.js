import React from 'react';
import { TableRow } from '../TableRow';

export function BodyRow(props) {
  const { children, className, ...rowProps } = props;

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
