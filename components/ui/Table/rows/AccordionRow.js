import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { useModes } from '@livepreso/content-react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ROW_TYPES } from '../table-constants';
import { ROW_TYPES_MAP } from '../table-type-maps';
import style from './AccordionRow.module.scss';

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
 * @param {(number|string)[]} [props.parentKeys=[]] - Array of parent keys.
 * @param {RowShape[]} [props.rows=[]] - Nested row configurations.
 * @param {Function} [props.component=null] - Custom component to render.
 * @param {string} [props.type=null] - The specific ROW_TYPES value.
 * @param {React.ReactNode} [props.children=null] - Child elements.
 * @param {string} [props.className=''] - CSS class name.
 */
export const AccordionRow = forwardRef(function AccordionRow(
  {
    uid,
    parentKeys = [],
    rows = [],
    component = null,
    type = null,
    children = null,
    className = '',
    isOpenDefault = false,
    ...rowProps
  },
  ref,
) {
  const { isPdfScreenshot } = useModes();
  const [isOpen, setIsOpen] = useState(isPdfScreenshot || isOpenDefault);
  const [openChildrenByDefault, setOpenChildrenByDefault] =
    useState(isOpenDefault);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const toggleAccordion = (toggle) => {
    setIsOpen(toggle ?? !isOpen);
  };

  useImperativeHandle(
    ref,
    () => ({
      open() {
        setIsOpen(true);
        setOpenChildrenByDefault(true);
      },
      close() {
        setIsOpen(false);
        setOpenChildrenByDefault(false);
      },
      isOpen() {
        return isOpen;
      },
    }),
    [isOpen],
  );

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
        onClick={handleClick}
        // optionally allow the child row to interact with the accordion
        toggleAccordion={toggleAccordion}
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
            isOpenDefault: openChildrenByDefault,
          });
        })}
    </>
  );
});
