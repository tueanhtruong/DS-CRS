import { Button } from '@mantine/core';
import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { Panel } from 'src/components';
import { GridItem, makeAGridItem, useFormBuilderContext } from 'src/modules';

export type DropPanelProps = React.PropsWithChildren<{}>;

export const DropPanel: React.FC<DropPanelProps> = ({ children }) => {
  const { uiSchema, handleUpsertItem } = useFormBuilderContext();

  const keys = Object.keys(uiSchema);
  const handleAddAnotherGrid = () => {
    handleUpsertItem(makeAGridItem());
  };

  return (
    <Panel>
      {keys.map((key, _, { length }) => {
        return (
          <GridItem
            key={`grid-item-${key}`}
            item={uiSchema[key]}
            disabledDelete={length === 1}
          />
        );
      })}
      <Button
        className="self-center border-dashed"
        size="lg"
        variant="outline"
        onClick={handleAddAnotherGrid}
      >
        <FaPlus className="mr-2" />
        Add More Grid
      </Button>
    </Panel>
  );
};
