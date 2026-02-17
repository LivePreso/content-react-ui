import React from 'react';

import classNames from 'classnames';

import { useAccordionControls } from './AccordionController';

import style from './AccordionToggleAll.module.scss';

export function AccordionToggleAll() {
  const { expandAll, collapseAll, hasRows, allRowsOpen } =
    useAccordionControls();

  function handleClick() {
    if (allRowsOpen) {
      collapseAll();
    } else {
      expandAll();
    }
  }

  if (!hasRows) {
    return null;
  }

  return (
    <div
      className={classNames(style.toggle, { [style.open]: allRowsOpen })}
      onClick={handleClick}
      title={allRowsOpen ? 'Collapse all' : 'Expand all'}
    ></div>
  );
}
