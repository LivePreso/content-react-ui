import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import style from './HighlightRow.module.scss';
import { BodyRow } from './BodyRow';

export function HighlightRow(props) {
  const { uid, isAccordion, children, className, ...rowProps } = props;

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

HighlightRow.defaultProps = {
  isAccordion: false,
  ...BodyRow.defaultProps,
};
