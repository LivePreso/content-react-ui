import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { BodyRow } from './BodyRow';
import style from './HeaderRow.module.scss';

export function HeaderRow(props) {
  const { isAccordion, children, className, uid, ...rowProps } = props;

  return (
    <BodyRow
      uid={uid}
      className={classNames(style.headerRow, className, {
        [style.accordionRow]: isAccordion,
      })}
      {...rowProps}
    >
      {children}
    </BodyRow>
  );
}

HeaderRow.propTypes = {
  isAccordion: PropTypes.bool,
  ...BodyRow.propTypes,
};

HeaderRow.defaultProps = {
  isAccordion: false,
  ...BodyRow.defaultProps,
};
