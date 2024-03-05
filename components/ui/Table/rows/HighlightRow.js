import React from 'react';
import classNames from 'classnames';
import style from './HighlightRow.module.scss';
import { BodyRow } from './BodyRow';

export function HighlightRow(props) {
  const { uid, children, className } = props;

  return (
    <BodyRow uid={uid} className={classNames([className, style.highlightRow])}>
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
