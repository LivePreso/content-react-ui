import React from 'react';
import classNames from 'classnames';
import style from './HighlightRow.module.scss';
import { BodyRow } from './BodyRow';

export function HighlightRow(props) {
  const { uid, children, className, ...rowProps } = props;

  return (
    <BodyRow
      uid={uid}
      className={classNames([className, style.highlightRow])}
      {...rowProps}
    >
      {children}
    </BodyRow>
  );
}

HighlightRow.propTypes = {
  ...BodyRow.propTypes,
};

HighlightRow.defaultProps = {
  ...BodyRow.defaultProps,
};
