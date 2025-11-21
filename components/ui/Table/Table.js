import React from 'react';
import PropTypes from 'prop-types';
import { ROW_TYPES } from './table-constants';
import { TableBase } from './TableBase';
import { OrderableTable } from './OrderableTable';

export function Table(props) {
  const { onReorder } = props;

  if (typeof onReorder === 'function') {
    return <OrderableTable {...props} />;
  }

  return <TableBase {...props} />;
}

Table.propTypes = {
  hasBorder: PropTypes.bool,
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      uid: PropTypes.string.isRequired,
      type: PropTypes.oneOf(Object.values(ROW_TYPES)),
      component: PropTypes.func,
      // We're letting the components further down check the cell types
      // rather than trying to check at the top level due to complexity of the propTypes
      cells: PropTypes.arrayOf(PropTypes.shape({})),
      rows: PropTypes.arrayOf(PropTypes.shape({})),
      className: PropTypes.string,
    }),
  ),
  columnWidths: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  ),
  children: PropTypes.node,
  sticky: PropTypes.oneOf(['none', 'row', 'column', 'both']),
  isPresoManagerInteractive: PropTypes.bool,
  tbodyClassName: PropTypes.string,
  className: PropTypes.string,
};

Table.defaultProps = {
  hasBorder: false,
  rows: [],
  columnWidths: [],
  children: [],
  sticky: 'none',
  isPresoManagerInteractive: false,
  tbodyClassName: '',
  className: '',
};
