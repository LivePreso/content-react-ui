import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from './TableCell.module.scss';

export function TableCell(props) {
  const {
    children,
    className,
    colSpan,
    rowSpan,
    rowSpanAdjacent,
    width,
    align,
  } = props;
  const compiledClasses = classNames(style.cell, className, {
    [style.hasSpanLeft]: rowSpanAdjacent === 'left',
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
    width: widthProp,
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

TableCell.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  align: PropTypes.oneOf(['left', 'right', 'center']),
  colSpan: PropTypes.number,
  rowSpan: PropTypes.number,
  rowSpanAdjacent: PropTypes.oneOf(['left', 'right']),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

TableCell.defaultProps = {
  children: [],
  className: '',
  colSpan: 1,
  rowSpan: 1,
  rowSpanAdjacent: null,
  width: null,
  align: 'left',
};
