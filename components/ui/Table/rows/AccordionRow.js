import React, { useState, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useModes } from '@livepreso/content-react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ROW_TYPES } from '../table-constants';
import { ROW_TYPES_MAP } from '../table-type-maps';
import style from './AccordionRow.module.scss';

export function AccordionRow({
  uid,
  type,
  children,
  rows,
  className,
  parentKeys,
  ...rowProps
}) {
  const { isPdfScreenshot } = useModes();
  const [isOpen, setIsOpen] = useState(isPdfScreenshot);
  const nodeRef = useRef(null);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const RowComponent = ROW_TYPES_MAP[type] || ROW_TYPES_MAP.HeaderRow;

  return (
    <>
      <RowComponent
        uid={uid}
        isAccordion
        data-companywide-interactive
        data-accordion-header={uid}
        data-accordion-parent={parentKeys.join(' ')}
        onClick={handleClick}
        {...rowProps}
        className={classNames(className, style.accordionRow, {
          [style.isOpen]: isOpen,
        })}
      >
        {children}
      </RowComponent>

      {isOpen && (
        <CSSTransition
          nodeRef={nodeRef}
          timeout={200}
          className={style.accordionGroup}
        >
          <div ref={nodeRef}>
            {rows.map(({ renderItem, parentKeys: rowParentKeys, ...row }) => {
              const parentKeysCollection = [
                ...(rowParentKeys || []),
                ...parentKeys,
                uid,
              ];

              return renderItem({
                ...row,
                parentKeys: parentKeysCollection,
                'data-accordion-parent': parentKeysCollection.join(' '),
              });
            })}
          </div>
        </CSSTransition>
      )}
    </>
  );
}

AccordionRow.propTypes = {
  uid: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  parentKeys: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  ),
  active: PropTypes.bool,
  onToggle: PropTypes.func,
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      parentKeys: PropTypes.arrayOf(
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
  parentKeys: [],
  active: false,
  onToggle: () => {},
  rows: [],
  type: null,
  children: null,
  className: '',
};
