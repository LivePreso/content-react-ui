import React from 'react';
import classNames from 'classnames';
import style from './HighlightRow.module.scss';
import { BodyRow } from './BodyRow';

export function HighlightRow(props) {
  const { cells, columns, className } = props;

  return (
    <BodyRow
      className={classNames([className, style.backgroundColour])}
      cells={cells}
      columns={columns}
    />
  );
}

HighlightRow.propTypes = {
  ...BodyRow.propTypes,
};

HighlightRow.defaultProps = {
  ...BodyRow.defaultProps,
};
