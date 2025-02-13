import React from 'react';
import PropTypes from 'prop-types';
import { MiddleEllipsisText } from '@ui/components/text/MiddleEllipsisText';
import classNames from 'classnames';
import { TableCell } from '../TableCell';
import style from './LegendCell.module.scss';

export function LegendCell(props) {
  const { value, color, className, valueClassName, ...cellProps } = props;

  return (
    <TableCell
      className={classNames(className, style.legendCell)}
      {...cellProps}
    >
      <div className={style.container}>
        <div className={style.token} style={{ backgroundColor: color }} />
        <MiddleEllipsisText className={classNames(valueClassName, style.label)}>
          {value}
        </MiddleEllipsisText>
      </div>
    </TableCell>
  );
}

LegendCell.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.string,
  valueClassName: PropTypes.string,
  ...TableCell.propTypes,
};

LegendCell.defaultProps = {
  value: '',
  color: '#000',
  valueClassName: null,
  ...TableCell.defaultProps,
};
