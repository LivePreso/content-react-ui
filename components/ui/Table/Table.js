import React from 'react';
import { TableBase } from './TableBase';
import { OrderableTable } from './OrderableTable';

/**
 * @typedef {Object} TableRow
 * @property {string} uid - Unique identifier for the row.
 * @property {('header'|'body'|'footer')} [type] - The type of row based on ROW_TYPES.
 * @property {Function} [component] - Optional component override for the row.
 * @property {Object[]} [cells] - Array of cell data objects.
 * @property {Object[]} [rows] - Nested rows for expandable table structures.
 * @property {string} [className] - CSS class for the row.
 */

/**
 * @param {Object} props
 * @param {boolean} [props.hasBorder=false] - Whether the table has a border.
 * @param {TableRow[]} [props.rows=[]] - Array of row objects to render.
 * @param {(number|string)[]} [props.columnWidths=[]] - Widths for each column.
 * @param {React.ReactNode} [props.children=[]] - Child elements.
 * @param {'none'|'row'|'column'|'both'} [props.sticky='none'] - Provides scrolling with a 'sticky' header or column.
 * @param {boolean} [props.isPresoManagerInteractive=false] - Allows interaction in PresoManager. Mouse events are otherwise ignored.
 * @param {string} [props.tbodyClassName=''] - CSS class for the tbody element.
 * @param {string} [props.className=''] - CSS class for the table element.
 */
export function Table({
  hasBorder = false,
  rows = [],
  columnWidths = [],
  children = [],
  sticky = 'none',
  isPresoManagerInteractive = false,
  tbodyClassName = '',
  className = '',
  ...otherProps
}) {
  const { onReorder, ...rest } = otherProps;

  const props = {
    hasBorder,
    rows,
    columnWidths,
    children,
    sticky,
    isPresoManagerInteractive,
    tbodyClassName,
    className,
  };

  if (typeof onReorder === 'function') {
    return <OrderableTable {...props} {...otherProps} />;
  }

  return <TableBase {...props} {...rest} />;
}
