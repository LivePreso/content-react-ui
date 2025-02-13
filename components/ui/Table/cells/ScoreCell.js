import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { TableCell } from '../TableCell';
import style from './ScoreCell.module.scss';

export function ScoreCell(props) {
  const { value, compareValue, color, className, subtitle, ...cellProps } =
    props;

  /* TODO revise this once a clean way of handling colors exists */
  const colorClass = color ? color(value) : '';

  return (
    <TableCell {...cellProps} className={classNames(className, colorClass)}>
      <div>
        <span>{value}</span>
        <span className={style.textMuted}> /{compareValue}</span>
      </div>
      {subtitle && <h6 className={style.textMuted}>{subtitle}</h6>}
    </TableCell>
  );
}

ScoreCell.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  compareValue: PropTypes.number,
  subtitle: PropTypes.string,
  color: PropTypes.func,
  ...TableCell.propTypes,
};

ScoreCell.defaultProps = {
  value: 0,
  compareValue: 100,
  subtitle: null,
  color: null,
  ...TableCell.defaultProps,
};
