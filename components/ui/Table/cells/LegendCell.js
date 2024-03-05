import React from 'react';
import PropTypes from 'prop-types';
import { Cell } from '@ui/components/ui/Table/Cell';
import { MiddleEllipsisText } from '@ui/components/text/MiddleEllipsisText';
import classNames from 'classnames';
import style from './LegendCell.module.scss';

export function LegendCell(props) {
  const { value, color, className, valueClassName, ...cellProps } = props;

  return (
    <Cell className={classNames(className, style.legendCell)} {...cellProps}>
      <div className={style.container}>
        <div className={style.token} style={{ backgroundColor: color }} />
        <MiddleEllipsisText className={classNames(valueClassName, style.label)}>
          {value}
        </MiddleEllipsisText>
      </div>
    </Cell>
  );
}

LegendCell.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.string,
  valueClassName: PropTypes.string,
  ...Cell.propTypes,
};

LegendCell.defaultProps = {
  value: '',
  color: '#000',
  valueClassName: null,
  ...Cell.defaultProps,
};
