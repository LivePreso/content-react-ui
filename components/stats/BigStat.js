import React from 'react';
import PropTypes from 'prop-types';
import { flexPropTypes } from '../layout/flex-prop-types';
import { Column } from '../layout';
import {
  percentifyFactory,
  decimalifyFactory,
  currencyCodifyFactory,
} from '../../utils/data-formatting';
import style from './BigStat.module.scss';

const formatterMap = {
  currency: currencyCodifyFactory({
    numDecimal: 2,
    currency: 'AUD',
  }),
  number: decimalifyFactory({ minDecimal: 0, maxDecimal: 2 }),
  percent: percentifyFactory({ numDecimal: 1 }),
};

export function BigStat(props) {
  const { label, value, format, className, ...columnProps } = props;

  const formatValue = (val) => {
    return formatterMap[format](val);
  };

  return (
    <Column className={className} {...columnProps}>
      {label && <p>{label}</p>}
      <h4 className={style.stat}>
        <strong>{formatValue(value)}</strong>
      </h4>
    </Column>
  );
}

BigStat.propTypes = {
  flex: flexPropTypes,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
  format: PropTypes.oneOf(['currency', 'number', 'percent']),
  label: PropTypes.string,
  value: PropTypes.number,
};

BigStat.defaultProps = {
  flex: 'none',
  width: null,
  height: null,
  format: 'number',
  className: null,
  label: null,
  value: null,
};
