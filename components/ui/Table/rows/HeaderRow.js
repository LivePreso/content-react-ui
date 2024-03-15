import React from 'react';
import classNames from 'classnames';
import { BodyRow } from './BodyRow';
import style from './HeaderRow.module.scss';

export function HeaderRow(props) {
  const { accordionHeaderKey, children, className, uid, ...rowProps } = props;

  return (
    <BodyRow
      uid={uid}
      accordionHeaderKey={accordionHeaderKey}
      className={classNames(style.headerRow, className, {
        [style.accordionRow]: accordionHeaderKey !== null,
      })}
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
