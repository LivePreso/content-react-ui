import React from 'react';
import PropTypes from 'prop-types';
import { Cell } from '@ui/components/ui/Table/Cell';
import { Nbsp } from '@ui/components/text/Nbsp';
import style from './DefinitionListCell.module.scss';

export function DefinitionListCell(props) {
  const { list, className, ...cellProps } = props;

  return (
    <Cell {...cellProps} className={className}>
      {list.map(({ label, value, formatter }) => {
        const formattedValue = formatter ? formatter(value) : value;

        return (
          <div key={`${label}${value}`}>
            <span className={style.definition}>{label}:</span>
            <Nbsp />
            <span>{formattedValue}</span>
          </div>
        );
      })}
    </Cell>
  );
}

DefinitionListCell.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.exact({
      label: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      formatter: PropTypes.func,
    }),
  ),
  ...Cell.propTypes,
};

DefinitionListCell.defaultProps = {
  list: [],
  ...Cell.defaultProps,
};
