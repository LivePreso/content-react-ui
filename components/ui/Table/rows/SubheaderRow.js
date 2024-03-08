import React from 'react';
import classNames from 'classnames';
import style from './SubheaderRow.module.scss';
import { BodyRow } from './BodyRow';

export function SubheaderRow(props) {
  const { uid, children, className, ...rowProps } = props;

  return (
    <BodyRow
      uid={uid}
      className={classNames([className, style.subheaderRow])}
      {...rowProps}
    >
      {children}
    </BodyRow>
  );
}

SubheaderRow.propTypes = {
  ...BodyRow.propTypes,
};

SubheaderRow.defaultProps = {
  ...BodyRow.defaultProps,
};
