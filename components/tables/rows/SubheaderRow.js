import React from 'react';
import classNames from 'classnames';
import style from './SubheaderRow.module.scss';
import { BodyRow } from './BodyRow';

export function SubheaderRow(props) {
  const { cells, columns, className } = props;

  return (
    <BodyRow
      className={classNames([className, style.backgroundColour])}
      cells={cells}
      columns={columns}
    />
  );
}

SubheaderRow.propTypes = {
  ...BodyRow.propTypes
};

SubheaderRow.defaultProps = {
  ...BodyRow.defaultProps
};
