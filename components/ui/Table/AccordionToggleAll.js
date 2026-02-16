import React, { useContext } from 'react';
import { TableContext } from './AccordionController';

import style from './AccordionToggleAll.module.scss';

export function AccordionToggleAll() {
  const { expandAll, collapseAll, hasRows, allRowsOpen } =
    useContext(TableContext);

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
