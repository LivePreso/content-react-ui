import React, { useRef } from 'react';
import { Table } from './Table';

import style from './ToggleTable.module.scss';

export function ToggleTable(props) {
  const rowRefs = useRef({});

  const addRowRef = (uid, el) => {
    rowRefs.current[uid] = el;
  };

  const removeRowRef = (uid) => {
    delete rowRefs.current[uid];
  };

  const handleClick = () => {
    if (!rowRefs.current) return;
    const allRefs = Object.values(rowRefs.current);
    const someTableClosed = allRefs.some((ref) => !ref.isOpen());

    if (someTableClosed) {
      allRefs.forEach((ref) => ref.open());
    } else {
      allRefs.forEach((ref) => ref.close());
    }
  };

  // function handleSingle() {
  //   if (tableRef.current.allAccordionsOpen()) {
  //     tableRef.current.closeAll();
  //   } else {
  //     tableRef.current.openAll();
  //   }
  // }

  // function handleMany() {
  //   const allRefs = Object.values(tableRef.current);
  //   const someTableClosed = allRefs.some((ref) => !ref.allAccordionsOpen());

  //   if (someTableClosed) {
  //     allRefs.forEach((ref) => ref.openAll());
  //   } else {
  //     allRefs.forEach((ref) => ref.closeAll());
  //   }
  // }

  return (
    <div className={style.toggleTable}>
      <AccordionToggleAll onClick={handleClick} />
      <Table addRow={addRowRef} removeRow={removeRowRef} {...props} />
    </div>
  );
}

function AccordionToggleAll({ onClick = () => {} }) {
  return <div className={style.toggle} onClick={onClick} title="Toggle all" />;
}
