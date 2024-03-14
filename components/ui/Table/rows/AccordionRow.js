import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ROW_TYPES } from '../table-constants';
import { ROW_TYPES_MAP } from '../table-type-maps';
import style from './AccordionRow.module.scss';

export function AccordionRow({
  uid,
  accordionParentKeys: parentKeys,
  type,
  children,
  rows,
  className,
  ...rowProps
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const RowComponent = ROW_TYPES_MAP[type] || ROW_TYPES_MAP.HeaderRow;

  return (
    <>
      <RowComponent
        uid={uid}
        accordionHeaderKey={uid}
        accordionParentKeys={parentKeys}
        onClick={handleClick}
        {...rowProps}
        className={classNames(className, style.accordionRow, {
          [style.isOpen]: isOpen,
        })}
      >
        {children}
      </RowComponent>

      {isOpen &&
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
      accordionHeaderKey: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]),
      accordionParentKeys: PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      ),
      onClick: PropTypes.func,
      children: PropTypes.node,
      className: PropTypes.string,
      renderItem: PropTypes.func,
    }),
  ),
  type: PropTypes.oneOf(Object.values(ROW_TYPES)),
  children: PropTypes.node,
  className: PropTypes.string,
};

AccordionRow.defaultProps = {
  accordionParentKeys: [],
  active: false,
  onToggle: () => {},
  rows: [],
  type: null,
  children: null,
  className: '',
};
