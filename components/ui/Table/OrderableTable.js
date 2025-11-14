import React from 'react';
import { DndContext } from '@dnd-kit/core';
import PropTypes from 'prop-types';
import { TableBase } from './TableBase';
import { createScaleModifier } from '../../../utils/scale-modifier';
import { useContentDimensions } from '../../../hooks/use-content-dimensions';

import style from './Table.module.scss';

export function OrderableTable(props) {
  const { onReorder, onDragStart } = props;

  const contentDimensions = useContentDimensions();
  const scaleDragger = createScaleModifier(contentDimensions);

  const handleDragStart = () => {
    onDragStart();
  };

  const handleDragEnd = ({ active, over }) => {
    onReorder({ from: active.id, to: over?.id });
  };

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      modifiers={[scaleDragger]}
    >
      <TableBase wrapperClassName={style.blockHorizontalScroll} {...props} />
    </DndContext>
  );
}

OrderableTable.propTypes = {
  uid: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  onReorder: PropTypes.func,
  onDragStart: PropTypes.func,
};

OrderableTable.defaultProps = {
  onReorder: () => {},
  onDragStart: () => {},
};
