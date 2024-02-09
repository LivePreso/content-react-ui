import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from './Table.module.scss';

export function Table(props) {
  const {
    hasBorder,
    isPresoManagerInteractive,
    children,
    className,
    sticky
  } = props;

  const opts = {};

  if (isPresoManagerInteractive) {
    opts['data-companywide-interactive'] = isPresoManagerInteractive;
  }

  const isSticky = sticky !== 'none';

  const stickyClasses = {
    row: [style.tableSticky, style.tableStickyRow],
    column: [style.tableSticky, style.tableStickyColumn],
    both: [style.tableSticky, style.tableStickyRow, style.tableStickyColumn]
  };

  const wrapperClasses = classNames(
    [style.tableWrapper].concat(isSticky ? stickyClasses[sticky] : []),
    {
      [style.hasBorder]: hasBorder,
      interactive: isSticky
    }
  );

  return (
    <div className={wrapperClasses} {...opts}>
      <table className={className}>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

Table.propTypes = {
  hasBorder: PropTypes.bool,
  children: PropTypes.node,
  sticky: PropTypes.oneOf(['none', 'row', 'column', 'both']),
  isPresoManagerInteractive: PropTypes.bool,
  className: PropTypes.string
};

Table.defaultProps = {
  hasBorder: false,
  children: [],
  sticky: 'none',
  isPresoManagerInteractive: false,
  className: ''
};

export function Row({ children, className }) {
  const compiledClasses = classNames(style.table, className);

  return <tr className={compiledClasses}>{children}</tr>;
}

Row.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

Row.defaultProps = {
  children: [],
  className: ''
};

export function Cell(props) {
  const {
    children,
    className,
    colSpan,
    rowSpan,
    rowSpanAdjacent,
    width,
    align
  } = props;
  const compiledClasses = classNames('cell', style.table, className, {
    [style.hasSpanLeft]: rowSpanAdjacent === 'left'
  });
  // width: number = px, string = %
  let widthProp = null;
  if (colSpan < 2) {
    if (typeof width === 'string') {
      widthProp = width;
    } else if (!Number.isNaN()) {
      widthProp = `${width}px`;
    }
  }
  const inline = {
    textAlign: align,
    width: widthProp
  };
  return (
    <td
      colSpan={colSpan || 1}
      style={inline}
      rowSpan={rowSpan || 1}
      className={compiledClasses}
    >
      {children}
    </td>
  );
}

Cell.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  align: PropTypes.oneOf(['left', 'right', 'center']),
  colSpan: PropTypes.number,
  rowSpan: PropTypes.number,
  rowSpanAdjacent: PropTypes.oneOf(['left', 'right']),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

Cell.defaultProps = {
  children: [],
  className: '',
  colSpan: 1,
  rowSpan: 1,
  rowSpanAdjacent: null,
  width: null,
  align: 'left'
};
