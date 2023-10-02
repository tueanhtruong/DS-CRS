import { Drawer, Title } from '@mantine/core';
import { GridItemForm, useFormBuilderContext } from 'src/modules/FormBuilder';
import styles from './styles.module.scss';
export const EditDrawer: React.FC = () => {
  const { setEditingItem, editingItem } = useFormBuilderContext();

  const isOpenEditForm = Boolean(editingItem);
  const title =
    editingItem?.schema === 'uiSchema' ? 'Edit Grid Item' : 'Edit Form Item';
  const Children =
    editingItem?.schema === 'uiSchema' ? GridItemForm : undefined;
  return (
    <Drawer
      opened={isOpenEditForm}
      title={<Title order={4}>{title}</Title>}
      position="right"
      withCloseButton
      onClose={() => setEditingItem()}
      transitionProps={{ duration: 450 }}
      className={styles['drawer-container']}
    >
      {Children ? <Children /> : null}
    </Drawer>
  );
};
