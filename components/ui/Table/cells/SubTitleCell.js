import React from 'react';
import PropTypes from 'prop-types';
import { TableCell } from '../TableCell';

export function SubTitleCell(props) {
  const { title, subtitle, ...cellProps } = props;
  return (
    <TableCell {...cellProps}>
      <div>{title}</div>
      {subtitle && <h6>{subtitle}</h6>}
    </TableCell>
  );
}

SubTitleCell.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  ...TableCell.propTypes,
};

SubTitleCell.defaultProps = {
  title: 'title',
  subtitle: null,
  ...TableCell.defaultProps,
};
