import { EditItemWrapper } from 'src/components';
import { GridBuilderType, useFormBuilderContext } from 'src/modules';
import { GridItemSlot } from 'src/modules/FormBuilder/RenderView/GridItem/GridItemSlot';
import styles from './styles.module.scss';
export type GridItemRenderViewProps = {
  item: GridBuilderType;
  disabledDelete?: boolean;
};

export const GridItem: React.FC<GridItemRenderViewProps> = ({
  item,
  disabledDelete,
}) => {
  const { setEditingItem, deleteItem } = useFormBuilderContext();
  const { id, columns } = item;
  const handleSetEditingItem = () => {
    setEditingItem({ schema: 'uiSchema', id });
  };

  const handledDeleteItem = () => {
    if (disabledDelete) return;
    deleteItem({ schema: 'uiSchema', id });
  };

  return (
    <EditItemWrapper
      onEdit={handleSetEditingItem}
      onDelete={handledDeleteItem}
      disabledDelete={disabledDelete}
    >
      <div className={styles['grid-item']}>
        {Array.from({ length: columns }).map((_, index) => (
          <GridItemSlot
            key={`grid-${id}-item-${index}`}
            id={id}
            index={index}
          />
        ))}
      </div>
    </EditItemWrapper>
  );
};
