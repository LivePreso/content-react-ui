import React, { useContext, useEffect, useState } from 'react';

import classNames from 'classnames';

import {
  AccordionControlContext,
  useAccordionControls,
} from '../AccordionController';
import { ROW_TYPES_MAP } from '../table-type-maps';

import style from './AccordionRow.module.scss';

export function AccordionRow(props) {
  // If there's no controller context, render an unmanaged accordion row that handles its own state
  // We don't use the useAccordionControls hook here because it throws an error if used outside of a controller.
  const { hasController } = useContext(AccordionControlContext);

  if (!hasController) {
    return <UnmanagedAccordionRow {...props} />;
  }

  return <ManagedAccordionRow {...props} />;
}

function UnmanagedAccordionRow(props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  const toggleAccordion = (toggle) => {
    setIsOpen(toggle ?? ((prev) => !prev));
  };

  return (
    <AccordionRowBase
      {...props}
      isOpen={isOpen}
      onClick={handleClick}
      toggleAccordion={toggleAccordion}
    />
  );
}

function ManagedAccordionRow({ uid, ...props }) {
  const { isRowExpanded, toggleRow, registerRow, unregisterRow } =
    useAccordionControls();

  const isOpen = isRowExpanded(uid);

  useEffect(() => {
    registerRow(uid);
    return () => unregisterRow(uid);
  }, [uid]);

  const handleClick = () => {
    toggleRow(uid);
  };

  const toggleAccordion = (toggle) => {
    toggleRow(uid);
  };

  return (
    <AccordionRowBase
      uid={uid}
      {...props}
      isOpen={isOpen}
      onClick={handleClick}
      toggleAccordion={toggleAccordion}
    />
  );
}

/**
 * @typedef {Object} RowShape
 * @property {(number|string)[]} [parentKeys]
 * @property {Function} [onClick]
 * @property {React.ReactNode} [children]
 * @property {string} [className]
 * @property {Function} [renderItem]
 */

/**
 * @param {Object} props
 * @param {number|string} props.uid - Unique identifier for the row.
 * @param {(number|string)[]} [props.parentKeys=[]] - Array of parent keys, used for nested accordion relationships.
 * @param {RowShape[]} [props.rows=[]] - Nested row configurations.
 * @param {Function} [props.component=null] - Custom component to render.
 * @param {string} [props.type=null] - The specific ROW_TYPES value.
 * @param {React.ReactNode} [props.children=null] - Child elements.
 * @param {string} [props.className=''] - CSS class name.
 */
function AccordionRowBase({
  uid,
  parentKeys = [],
  rows = [],
  component = null,
  type = null,
  children = null,
  className = '',
  isOpen = false,
  ...rowProps
}) {
  const RowComponent =
    component || ROW_TYPES_MAP[type] || ROW_TYPES_MAP.HeaderRow;

  return (
    <>
      <RowComponent
        uid={uid}
        isAccordion
        data-companywide-interactive
        data-accordion-header={uid}
        data-accordion-parent={parentKeys.join(' ')}
        {...rowProps}
        className={classNames(className, style.accordionRow, {
          [style.isOpen]: isOpen,
        })}
      >
        {children}
      </RowComponent>

      {isOpen &&
        rows.map(({ renderItem, parentKeys: rowParentKeys, ...row }) => {
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
    </>
  );
}
