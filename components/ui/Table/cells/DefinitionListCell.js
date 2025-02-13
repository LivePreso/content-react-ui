import React from 'react';
import PropTypes from 'prop-types';
import { Nbsp } from '@ui/components/text/Nbsp';
import { TableCell } from '../TableCell';
import style from './DefinitionListCell.module.scss';

export function DefinitionListCell(props) {
  const { list, className, ...cellProps } = props;

  return (
    <TableCell {...cellProps} className={className}>
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
    </TableCell>
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
  ...TableCell.propTypes,
};

DefinitionListCell.defaultProps = {
  list: [],
  ...TableCell.defaultProps,
};
