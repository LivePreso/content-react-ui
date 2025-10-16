import React from 'react';
import { DndContext } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { TableBase } from './TableBase';
import { createScaleModifier } from '../../../utils/scale-modifier';

const getUids = (rows) => {
  return rows.flatMap(({ uid, rows: nestedRows = [] }) => {
    if (nestedRows.length > 0) {
      return [uid, ...getUids(nestedRows)];
    }

    return [uid];
  });
};

export function OrderableTable(props) {
  const { onReorder, rows } = props;

  const items = getUids(rows);

  const scaleDragger = createScaleModifier();

  const handleDragEnd = () => {
    onReorder();
  };

  return (
    <DndContext onDragEnd={handleDragEnd} modifiers={[scaleDragger]}>
      <SortableContext
        items={items}
        strategy={verticalListSortingStrategy}
        modifiers={[scaleDragger]}
      >
        <TableBase {...props} />
      </SortableContext>
    </DndContext>
  );
}
