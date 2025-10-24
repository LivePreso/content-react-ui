import React from 'react';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import classNames from 'classnames';
import { TableRow } from '../TableRow';

import style from './OrderableRow.module.scss';

export function OrderableRow(props) {
  const {
    uid,
    children,
    className,
    isOrderable,
    onReorder,
    isDragging,
    ...rowProps
  } = props;

  const { isOver, setNodeRef: setNodeDroppable } = useDroppable({
    id: uid,
  });

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: uid,
  });

  const cssStyle = {
    opacity: !isDragging || isOver ? 1 : 0.4,
    transform: CSS.Translate.toString(transform),
  };

  return (
    <TableRow
      ref={isDragging ? setNodeDroppable : setNodeRef}
      uid={uid}
      style={cssStyle}
      className={classNames(className, {
        [style.isOver]: isOver,
      })}
      {...attributes}
      {...listeners}
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
