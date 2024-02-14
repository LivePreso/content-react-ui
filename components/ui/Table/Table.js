import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getColWidth } from '@ui/utils/generate-table-layout';
import { ROW_TYPES, CELL_TYPES_MAP } from './table-constants';
import { TextCell } from './cells';
import { BodyRow, HeaderRow, SubheaderRow, HighlightRow } from './rows';
import style from './Table.module.scss';

export function Table(props) {
  const {
    hasBorder,
    isPresoManagerInteractive,
    rows,
    columnWidths,
    children,
    className,
    sticky,
  } = props;

  const opts = {};

  if (isPresoManagerInteractive) {
    opts['data-companywide-interactive'] = isPresoManagerInteractive;
  }

  const isSticky = sticky !== 'none';

  const stickyClasses = {
    row: [style.tableSticky, style.tableStickyRow],
    column: [style.tableSticky, style.tableStickyColumn],
    both: [style.tableSticky, style.tableStickyRow, style.tableStickyColumn],
  };

  const outputRows = rows.map((row) => {
    const { type: rowType, uid, cells = [], className: rowClassName } = row;

    const rowCells = cells.map((cell) => {
      const { type, config, ...cellProps } = cell;
      const width = getColWidth(columnWidths, cells, cell);
      // augment with a key
      cellProps.key = cellProps.uid;
      cellProps.width = width;

      const CellComponent = CELL_TYPES_MAP[type];

      if (!CellComponent) {
        const errorMessage = { value: `unknown component '${type}' ` };
        return <TextCell {...cellProps} config={errorMessage} />;
      }

      return <CellComponent {...cellProps} {...config} />;
    });

    if (rowType === ROW_TYPES.HEADER) {
      return (
        <HeaderRow key={uid} uid={uid} className={rowClassName}>
          {rowCells}
        </HeaderRow>
      );
    }
    if (row.type === ROW_TYPES.SUBHEADER) {
      return (
        <SubheaderRow key={uid} uid={uid} className={rowClassName}>
          {rowCells}
        </SubheaderRow>
      );
    }
    if (row.type === ROW_TYPES.HIGHLIGHT) {
      return (
        <HighlightRow key={uid} uid={uid} className={rowClassName}>
          {rowCells}
        </HighlightRow>
      );
    }
    // default row style
    return (
      <BodyRow key={uid} uid={uid} className={rowClassName}>
        {rowCells}
      </BodyRow>
    );
  });

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
        <tbody>
          {outputRows}
          {children}
        </tbody>
      </table>
    </div>
  );
}

Table.propTypes = {
  hasBorder: PropTypes.bool,
  rows: PropTypes.arrayOf(
    PropTypes.exact({
      uid: PropTypes.string.isRequired,
      type: PropTypes.oneOf(Object.values(ROW_TYPES)).isRequired,
      // We're letting the components further down check the cell types
      // rather than trying to check at the top level due to complexity of the propTypes
      cells: PropTypes.arrayOf(PropTypes.object),
      className: PropTypes.string,
    }),
  ),
  columnWidths: PropTypes.arrayOf(
    PropTypes.oneOf([PropTypes.number, PropTypes.string]),
  ),
  children: PropTypes.node,
  sticky: PropTypes.oneOf(['none', 'row', 'column', 'both']),
  isPresoManagerInteractive: PropTypes.bool,
  className: PropTypes.string,
};

Table.defaultProps = {
  hasBorder: false,
  rows: [],
  columnWidths: [],
  children: [],
  sticky: 'none',
  isPresoManagerInteractive: false,
  className: '',
};
