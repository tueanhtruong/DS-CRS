import { useDroppable } from '@dnd-kit/core';

type GridItemSlotProps = React.PropsWithChildren<{
  id: string;
  index: number;
}>;

export const GridItemSlot: React.FC<GridItemSlotProps> = ({
  children,
  index,
  id,
}) => {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });
  return (
    <div
      ref={setNodeRef}
      data-drop-over={isOver}
      data-grid-item-slot-index={`${id}-${index}`}
    >
      {children}
    </div>
  );
};
