import React, { useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import { TableBase } from './TableBase';
import { createScaleModifier } from '../../../utils/scale-modifier';
import { useContentDimensions } from '../../../hooks/use-content-dimensions';

export function OrderableTable(props) {
  const [isDragging, setIsDragging] = useState(false);
  const { onReorder } = props;

  const contentDimensions = useContentDimensions();
  const scaleDragger = createScaleModifier(contentDimensions);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = ({ active, over }) => {
    setIsDragging(false);
    onReorder({ from: active.id, to: over?.id });
  };

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      modifiers={[scaleDragger]}
    >
      <TableBase isDragging={isDragging} {...props} />
    </DndContext>
  );
}
