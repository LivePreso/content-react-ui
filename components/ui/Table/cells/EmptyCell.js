import React from 'react';
import classNames from 'classnames';
import style from './EmptyCell.module.scss';
import { TableCell } from '../TableCell';

export function EmptyCell(props) {
  const { className, ...cellProps } = props;

  return (
    <TableCell className={classNames(className, style.empty)} {...cellProps} />
  );
}

EmptyCell.propTypes = {
  ...TableCell.propTypes,
};

EmptyCell.defaultProps = {
  ...TableCell.defaultProps,
};
