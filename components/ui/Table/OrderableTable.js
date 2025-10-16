import React from 'react';
import { DndContext } from '@dnd-kit/core';
import { TableBase } from './TableBase';
import { createScaleModifier } from '../../../utils/scale-modifier';

export function OrderableTable(props) {
  const { onReorder } = props;

  const scaleDragger = createScaleModifier();

  const handleDragEnd = () => {
    onReorder();
  };

  return (
    <DndContext onDragEnd={handleDragEnd} modifiers={[scaleDragger]}>
      <TableBase {...props} />
    </DndContext>
  );
}
