import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import style from './HighlightRow.module.scss';
import { BodyRow } from './BodyRow';

export function HighlightRow({
  uid,
  isAccordion = false,
  children = null,
  className = '',
  ...rowProps
}) {
  return (
    <BodyRow
      uid={uid}
      className={classNames(className, style.highlightRow, {
        [style.accordionRow]: isAccordion,
      })}
      {...rowProps}
    >
      {children}
    </BodyRow>
  );
}

HighlightRow.propTypes = {
  isAccordion: PropTypes.bool,
  ...BodyRow.propTypes,
};
