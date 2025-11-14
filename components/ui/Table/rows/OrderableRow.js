import React from 'react';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import classNames from 'classnames';
import { TableRow } from '../TableRow';

import style from './OrderableRow.module.scss';

export function OrderableRow(props) {
  const { uid, children, className, isOrderable, onReorder, ...rowProps } =
    props;

  const { isOver, setNodeRef: setNodeDroppable } = useDroppable({
    id: uid,
  });

  const { active, setNodeRef, transform } = useDraggable({
    id: uid,
  });

  const cssStyle = {
    opacity: !active || isOver ? 1 : 0.4,
    transform: CSS.Translate.toString(transform),
  };

  return (
    <TableRow
      ref={active ? setNodeDroppable : setNodeRef}
      uid={uid}
      style={cssStyle}
      className={classNames(className, {
        [style.isOver]: isOver,
      })}
      {...rowProps}
    >
      {children}
    </TableRow>
  );
}

OrderableRow.propTypes = {
  ...TableRow.propTypes,
};

OrderableRow.defaultProps = {
  ...TableRow.defaultProps,
};
