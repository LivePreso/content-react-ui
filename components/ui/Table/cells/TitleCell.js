import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { TableCell } from '../TableCell';
import style from './TitleCell.module.scss';

export function TitleCell(props) {
  const { title, className, titleClassName, ...cellProps } = props;

  return (
    <TableCell
      className={classNames(className, style.titleCell)}
      {...cellProps}
    >
      <span className={classNames(titleClassName, style.title)}>{title}</span>
    </TableCell>
  );
}

TitleCell.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  titleClassName: PropTypes.string,
  ...TableCell.propTypes,
};

TitleCell.defaultProps = {
  title: '',
  titleClassName: null,
  ...TableCell.defaultProps,
};
