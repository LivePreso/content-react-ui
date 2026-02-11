import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import classNames from 'classnames';
import { getColWidth } from '../../../utils/generate-table-layout';
import { EMPTY_ACCORDION_KEY } from './table-constants';
import { CELL_TYPES_MAP, ROW_TYPES_MAP } from './table-type-maps';
import { TextCell, EmptyCell } from './cells';
import style from './Table.module.scss';
import { BodyRow } from './rows';
import { AccordionRow } from './rows/AccordionRow';

/**
 * @typedef {Object} TableRow
 * @property {string} uid - Unique identifier for the row
 * @property {string} [type] - One of ROW_TYPES values
 * @property {Function} [component] - Custom component to render the row
 * @property {Object[]} [cells] - Array of cell data objects
 * @property {Object[]} [rows] - Nested rows for sub-grids
 * @property {string} [className] - Optional CSS class for the row
 */

/**
 * @param {Object} props
 * @param {boolean} [props.hasBorder=false] - Whether the table has a border
 * @param {TableRow[]} [props.rows=[]] - Array of row objects
 * @param {(number|string)[]} [props.columnWidths=[]] - Array of widths for columns
 * @param {React.ReactNode} [props.children=[]] - Table children
 * @param {'none'|'row'|'column'|'both'} [props.sticky='none'] - Sticky behavior configuration
 * @param {boolean} [props.isPresoManagerInteractive=false] - Interaction flag for presentation manager
 * @param {Function|null} [props.onReorder=null] - Callback function for reordering rows
 * @param {string} [props.wrapperClassName=''] - CSS class for the table wrapper
 * @param {string} [props.tbodyClassName=''] - CSS class for the tbody element
 * @param {string} [props.className=''] - CSS class for the table element
 */
export const TableBase = forwardRef(function TableBase(
  {
    hasBorder = false,
    rows = [],
    columnWidths = [],
    children = [],
    sticky = 'none',
    isPresoManagerInteractive = false,
    onReorder = null,
    wrapperClassName = '',
    tbodyClassName = '',
    className = '',
  },
  ref,
) {
  const opts = {};

  if (isPresoManagerInteractive) {
    opts['data-companywide-interactive'] = true;
  }

  const rowRefs = useRef({});

  const isSticky = sticky !== 'none';

  const stickyClasses = {
    row: [style.tableSticky, style.tableStickyRow],
    column: [style.tableSticky, style.tableStickyColumn],
    both: [style.tableSticky, style.tableStickyRow, style.tableStickyColumn],
  };

  // empty row of columns with colSpan 1
  // Fixes problem with colSpans used in header
  const blankRow = (
    <BodyRow uid="empty-row" data-accordion-header={EMPTY_ACCORDION_KEY}>
      {columnWidths.map((width, emptyIdx) => {
        return (
          <EmptyCell
            key={`empty-cell-${width}-${emptyIdx + 1}`}
            width={width}
          />
        );
      })}
    </BodyRow>
  );

  useImperativeHandle(
    ref,
    () => ({
      openAll() {
        Object.values(rowRefs.current).forEach((row) => {
          row?.open();
        });
      },

      closeAll() {
        Object.values(rowRefs.current).forEach((row) => {
          row?.close();
        });
      },

      allAccordionsOpen() {
        const someClosed = Object.values(rowRefs.current).some(
          (row) => !row.isOpen(),
        );

        return !someClosed;
      },
    }),
    [rowRefs.current],
  );

  const generateRow = (row) => {
    const {
      type: rowType,
      component: rowComponent,
      uid,
      cells = [],
      headerKey,
      rows: accordionRows,
      className: rowClassName,
      isOpenDefault,
      ...rowProps
    } = row;

    const rowCells = cells.map((cell) => {
      const { type, component, config, ...cellProps } = cell;
      const width = getColWidth(columnWidths, cells, cell);

      // augment with a key
      const newCellProps = {
        ...cellProps,
        width,
      };

      const CellComponent = component || CELL_TYPES_MAP[type];

      if (!CellComponent) {
        const errorMessage = { value: `unknown component '${type}' ` };
        return (
          <TextCell
            key={cellProps.uid}
            config={errorMessage}
            {...newCellProps}
          />
        );
      }

      return (
        <CellComponent key={cellProps.uid} {...newCellProps} {...config} />
      );
    });

    if (accordionRows?.length) {
      return (
        <>
          <AccordionRow
            key={uid}
            uid={uid}
            type={rowType}
            component={rowComponent}
            onReorder={onReorder}
            rows={accordionRows.map((ar) => {
              return {
                ...ar,
                renderItem: (item) => generateRow(item),
              };
            })}
            className={rowClassName}
            ref={(el) => {
              if (el) {
                rowRefs.current[uid] = el;
              } else {
                delete rowRefs.current[uid];
              }
            }}
            isOpenDefault={isOpenDefault}
            {...rowProps}
          >
            {rowCells}
          </AccordionRow>
        </>
      );
    }

    const RowComponent =
      rowComponent || ROW_TYPES_MAP[rowType] || ROW_TYPES_MAP.BodyRow;

    return (
      <RowComponent
        key={uid}
        uid={uid}
        onReorder={onReorder}
        className={rowClassName}
        data-accordion-header={headerKey}
        {...rowProps}
      >
        {rowCells}
      </RowComponent>
    );
  };

  const wrapperClasses = classNames(
    wrapperClassName,
    [style.tableWrapper].concat(isSticky ? stickyClasses[sticky] : []),
    {
      [style.hasBorder]: hasBorder,
      interactive: isSticky,
    },
  );

  const tableClasses = classNames(className, style.table, {
    [style.isSticky]: isSticky,
  });

  return (
    <div className={wrapperClasses} {...opts}>
      <table className={tableClasses}>
        <tbody className={tbodyClassName}>
          {blankRow}
          {rows.map((row) => generateRow(row))}
          {children}
        </tbody>
      </table>
    </div>
  );
});
