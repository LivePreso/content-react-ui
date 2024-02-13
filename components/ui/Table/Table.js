import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ROW_TYPES, columnPropTypes } from './table-constants';
import { BodyRow, HeaderRow, SubheaderRow, HighlightRow } from './rows';
import style from './Table.module.scss';

export function Table(props) {
  const {
    hasBorder,
    isPresoManagerInteractive,
    rows,
    columns,
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
    const {
      type: rowType,
      uid,
      cells: rowCells,
      className: rowClassName,
    } = row;
    if (rowType === ROW_TYPES.HEADER) {
      // header uses columns to generate cells, not rowCells
      return (
        <HeaderRow
          key={uid}
          uid={uid}
          columns={columns}
          className={rowClassName}
        />
      );
    }
    if (row.type === ROW_TYPES.SUBHEADER) {
      return (
        <SubheaderRow
          key={uid}
          uid={uid}
          cells={rowCells}
          columns={columns}
          className={rowClassName}
        />
      );
    }
    if (row.type === ROW_TYPES.HIGHLIGHT) {
      return (
        <HighlightRow
          key={uid}
          uid={uid}
          cells={rowCells}
          columns={columns}
          className={rowClassName}
        />
      );
    }
    // default row style
    return (
      <BodyRow
        key={uid}
        uid={uid}
        cells={rowCells}
        columns={columns}
        className={rowClassName}
      />
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
      // Different types above will have different allowed cell types. We'll use the
      // component attached to each type to further check the config props.
      cells: PropTypes.arrayOf(PropTypes.object),
      className: PropTypes.string,
    }),
  ),
  columns: columnPropTypes,
  children: PropTypes.node,
  sticky: PropTypes.oneOf(['none', 'row', 'column', 'both']),
  isPresoManagerInteractive: PropTypes.bool,
  className: PropTypes.string,
};

Table.defaultProps = {
  hasBorder: false,
  rows: [],
  columns: [],
  children: [],
  sticky: 'none',
  isPresoManagerInteractive: false,
  className: '',
};
