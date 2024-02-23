import React from 'react';
import classNames from 'classnames';
import { Cell } from '@ui/components/ui/Table/Cell';
import style from './EmptyCell.module.scss';

export function EmptyCell(props) {
  const { className, ...cellProps } = props;

  return <Cell className={classNames(className, style.empty)} {...cellProps} />;
}

EmptyCell.propTypes = {
  ...Cell.propTypes,
};

EmptyCell.defaultProps = {
  ...Cell.defaultProps,
};
