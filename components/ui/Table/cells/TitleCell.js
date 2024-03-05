import React from 'react';
import PropTypes from 'prop-types';
import { Cell } from '@ui/components/ui/Table/Cell';
import classNames from 'classnames';
import style from './TitleCell.module.scss';

export function TitleCell(props) {
  const { title, className, titleClassName, ...cellProps } = props;

  return (
    <Cell className={classNames(className, style.titleCell)} {...cellProps}>
      <span className={classNames(titleClassName, style.title)}>{title}</span>
    </Cell>
  );
}

TitleCell.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  titleClassName: PropTypes.string,
  ...Cell.propTypes,
};

TitleCell.defaultProps = {
  title: '',
  titleClassName: null,
  ...Cell.defaultProps,
};
