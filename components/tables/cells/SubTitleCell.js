import PropTypes from 'prop-types';
import { Cell } from '@ui/components/ui/Table';
import React from 'react';

export function SubTitleCell(props) {
  const { title, subtitle, ...cellProps } = props;
  return (
    <Cell {...cellProps}>
      <div>{title}</div>
      {subtitle && <h6>{subtitle}</h6>}
    </Cell>
  );
}

SubTitleCell.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  ...Cell.propTypes,
};

SubTitleCell.defaultProps = {
  title: 'title',
  subtitle: null,
  ...Cell.defaultProps,
};
