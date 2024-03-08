import React from 'react';
import classNames from 'classnames';
import { BodyRow } from './BodyRow';
import style from './HeaderRow.module.scss';

export function HeaderRow(props) {
  const { children, className, uid, ...rowProps } = props;

  return (
    <BodyRow
      uid={uid}
      className={classNames(style.headerRow, className)}
      {...rowProps}
    >
      {children}
    </BodyRow>
  );
}

HeaderRow.propTypes = {
  ...BodyRow.propTypes,
};

HeaderRow.defaultProps = {
  ...BodyRow.defaultProps,
};
