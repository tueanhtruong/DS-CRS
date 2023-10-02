import { ActionIcon, Flex } from '@mantine/core';
import { PropsWithChildren } from 'react';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import styles from './styles.module.scss';

export type EditItemWrapperProps = PropsWithChildren<
  Partial<{
    onEdit: (e: React.MouseEvent) => void;
    onDelete: (e: React.MouseEvent) => void;
    disabledDelete?: boolean;
  }>
>;

export const EditItemWrapper: React.FC<EditItemWrapperProps> = ({
  children,
  onDelete,
  onEdit,
  disabledDelete,
}) => {
  return (
    <div className={styles.wrapper}>
      <Flex className={styles['floating-buttons']}>
        <ActionIcon.Group>
          <ActionIcon
            variant="white"
            size="md"
            aria-label="Edit Item"
            onClick={onEdit}
            radius={0}
          >
            <FaRegEdit />
          </ActionIcon>
          <ActionIcon
            variant="white"
            size="md"
            aria-label="Delete Item"
            onClick={onDelete}
            color="red"
            radius={0}
            disabled={disabledDelete}
          >
            <FaRegTrashAlt />
          </ActionIcon>
        </ActionIcon.Group>
      </Flex>
      <div className={styles.item}>{children}</div>
    </div>
  );
};
