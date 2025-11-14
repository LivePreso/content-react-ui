import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from './TableDragHandle.module.scss';

export function TableDragHandle({ uid, className, children }) {
  const { isDragging, attributes, listeners } = useDraggable({
    id: uid,
  });

  return (
    <div
      className={classNames(className, style.dragHandle, {
        [style.isDragging]: isDragging,
      })}
      {...attributes}
      {...listeners}
    >
      {children}
    </div>
  );
}

TableDragHandle.propTypes = {
  uid: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  children: PropTypes.node,
};

TableDragHandle.defaultProps = {
  children: null,
};
