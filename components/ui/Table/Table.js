import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getColWidth } from '../../../utils/generate-table-layout';
import { ROW_TYPES, EMPTY_ACCORDION_KEY } from './table-constants';
import { CELL_TYPES_MAP, ROW_TYPES_MAP } from './table-type-maps';
import { TextCell, EmptyCell } from './cells';
import style from './Table.module.scss';
import { BodyRow } from './rows';
import { AccordionRow } from './rows/AccordionRow';

export function Table(props) {
  const {
    hasBorder,
    isPresoManagerInteractive,
    rows,
    columnWidths,
    children,
    className,
    tbodyClassName,
    sticky,
  } = props;

  const opts = {};

  if (isPresoManagerInteractive) {
    opts['data-companywide-interactive'] = true;
  }

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

  const generateRow = (row) => {
    const {
      type: rowType,
      uid,
      cells = [],
      headerKey,
      rows: accordionRows,
      className: rowClassName,
      ...rowProps
    } = row;

    const rowCells = cells.map((cell) => {
      const { type, config, ...cellProps } = cell;
      const width = getColWidth(columnWidths, cells, cell);

      // augment with a key
      const newCellProps = {
        ...cellProps,
        key: cellProps.uid,
        width,
      };

      const CellComponent = CELL_TYPES_MAP[type];

      if (!CellComponent) {
        const errorMessage = { value: `unknown component '${type}' ` };
        return <TextCell {...newCellProps} config={errorMessage} />;
      }

      return <CellComponent {...newCellProps} {...config} />;
    });

    if (accordionRows?.length) {
      return (
        <AccordionRow
          key={uid}
          uid={uid}
          type={rowType}
          rows={accordionRows.map((ar) => {
            return {
              ...ar,
              renderItem: (item) => generateRow(item),
            };
          })}
          className={rowClassName}
          {...rowProps}
        >
          {rowCells}
        </AccordionRow>
      );
    }

    const RowComponent = ROW_TYPES_MAP[rowType] || ROW_TYPES_MAP.BodyRow;

    return (
      <RowComponent
        key={uid}
        uid={uid}
        className={rowClassName}
        data-accordion-header={headerKey}
        {...rowProps}
      >
        {rowCells}
      </RowComponent>
    );
  };

  const wrapperClasses = classNames(
    [style.tableWrapper].concat(isSticky ? stickyClasses[sticky] : []),
    {
      [style.hasBorder]: hasBorder,
      interactive: isSticky,
    },
  );

  return (
    <div className={wrapperClasses} {...opts}>
      <table className={className}>
        <tbody className={tbodyClassName}>
          {blankRow}
          {rows.map((row) => generateRow(row))}
          {children}
        </tbody>
      </table>
    </div>
  );
}

Table.propTypes = {
  hasBorder: PropTypes.bool,
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      uid: PropTypes.string.isRequired,
      type: PropTypes.oneOf(Object.values(ROW_TYPES)).isRequired,
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
