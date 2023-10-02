'use client';

import { DndContext, DragOverlay } from '@dnd-kit/core';
import React from 'react';
import { Draggable, Droppable, Panel } from 'src/components';
import { useProtectedRoute } from 'src/modules';
import {
  DropPanel,
  EditDrawer,
  FormBuilderProvider,
} from 'src/modules/FormBuilder';
import styles from './styles.module.scss';

export default function Store() {
  const { PlaceholderElement } = useProtectedRoute();
  const [parent, setParent] = React.useState(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const draggable = <Draggable id="draggable">Go ahead, drag me.</Draggable>;
  function handleDragEnd({ over }: { over: any }) {
    setParent(over ? over.id : null);
    setIsDragging(false);
  }
  function handleDragStart() {
    setIsDragging(true);
  }
  return (
    <FormBuilderProvider>
      <div className={styles['grid-wrapper']}>
        <Panel stickyHeight className="sticky top-0">
          <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
            {draggable}
            <DragOverlay>Go ahead, drag me.</DragOverlay>
            <Droppable id="droppable">
              {parent === 'droppable' ? 'Go ahead, drag me.' : 'Drop here'}
            </Droppable>
            <Droppable id="droppable2">
              {parent === 'droppable2' ? 'Go ahead, drag me.' : 'Drop here 2'}
            </Droppable>
          </DndContext>
        </Panel>
        <DropPanel />
      </div>

      <EditDrawer />
      {PlaceholderElement}
    </FormBuilderProvider>
  );
}
