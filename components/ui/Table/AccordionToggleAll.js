import React from 'react';

import { useAccordionControls } from './use-accordion-controls';

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
      className={style.toggle}
      onClick={handleClick}
      title={allRowsOpen ? 'Collapse all' : 'Expand all'}
      data-companywide-interactive
    />
  );
}
