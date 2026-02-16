import React, { useContext } from 'react';
import { AccordionControlContext } from './AccordionController';

import style from './AccordionToggleAll.module.scss';

export function AccordionToggleAll() {
  const { expandAll, collapseAll, hasRows, allRowsOpen } = useContext(
    AccordionControlContext,
  );

  function handleClick() {
    if (hasRows) {
      if (allRowsOpen) {
        collapseAll();
      } else {
        expandAll();
      }
    }
  }

  return (
    <div
      className={style.toggle}
      onClick={handleClick}
      title={'Toggle all'}
    ></div>
  );
}
