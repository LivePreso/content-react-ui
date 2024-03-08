import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Row } from '../Row';
import { HeaderRow } from './HeaderRow';
import style from './AccordionRow.module.scss';

export function AccordionRow({
  uid,
  active,
  accordionParentKeys: parentKeys,
  children,
  onToggle,
  rows,
  className,
  ...rowProps
}) {
  const handleClick = () => {
    onToggle(!active);
  };

  return (
    <>
      <HeaderRow
        uid={uid}
        accordionHeaderKey={uid}
        accordionParentKeys={parentKeys}
        onClick={handleClick}
        {...rowProps}
        className={classNames(className, style.accordionRow, {
          [style.isOpen]: active,
        })}
      >
        {children}
      </HeaderRow>

      {active &&
        rows.map(({ renderItem, accordionParentKeys = [], ...row }, idx) => {
          return renderItem({
            key: `${uid}-${idx + 1}`,
            ...row,
            accordionParentKeys: [...accordionParentKeys, ...parentKeys, uid],
          });
        })}
    </>
  );
}

AccordionRow.propTypes = {
  uid: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  accordionParentKeys: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  ),
  active: PropTypes.bool,
  onToggle: PropTypes.func,
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      ...Row.propTypes,
      renderItem: PropTypes.func,
    }),
  ),
  children: PropTypes.node,
  className: PropTypes.string,
};

AccordionRow.defaultProps = {
  accordionParentKeys: [],
  active: false,
  onToggle: () => {},
  rows: [],
  children: null,
  className: '',
};
