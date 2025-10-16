import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TableRow } from '../TableRow';

export function OrderableRow(props) {
  const { uid, children, className, isOrderable, onReorder, ...rowProps } =
    props;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: uid,
    });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <TableRow
      ref={setNodeRef}
      uid={uid}
      style={style}
      className={className}
      {...attributes}
      {...listeners}
      {...style}
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
