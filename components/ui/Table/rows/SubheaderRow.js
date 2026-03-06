import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import style from './SubheaderRow.module.scss';
import { BodyRow } from './BodyRow';

export function SubheaderRow({
  uid,
  isAccordion = false,
  children = null,
  className = '',
  ...rowProps
}) {
  return (
    <BodyRow
      uid={uid}
      className={classNames(className, style.subheaderRow, {
        [style.accordionRow]: isAccordion,
      })}
      {...rowProps}
    >
      {children}
    </BodyRow>
  );
}

SubheaderRow.propTypes = {
  isAccordion: PropTypes.bool,
  ...BodyRow.propTypes,
};
