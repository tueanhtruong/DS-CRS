import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Flex, NumberInput } from '@mantine/core';
import { useForm } from 'react-hook-form';
import {
  GridBuilderType,
  useFormBuilderContext,
} from 'src/modules/FormBuilder';
import * as Yup from 'yup';

const schema = Yup.object({
  columns: Yup.number().required().min(1).max(4),
});

type GridItemForm = {
  columns: number;
};

export const GridItemForm: React.FC = () => {
  const { selectedItem, setEditingItem, handleUpsertItem } =
    useFormBuilderContext();

  const { item } = selectedItem ?? {};
  const {
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<GridItemForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      columns: item?.columns,
    },
  });

  if (!selectedItem) return null;

  const onSubmit = (data: GridItemForm) => {
    if (item) {
      const updatedItem: GridBuilderType = {
        ...item,
        ...data,
      };

      handleUpsertItem(updatedItem);
      setEditingItem();
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} id="grid-form">
        <Flex direction={'column'} flex={'1 1 auto'}>
          <NumberInput
            label="Grid columns"
            placeholder="Grid columns"
            min={1}
            max={4}
            value={getValues('columns')}
            onChange={(value) =>
              setValue(
                'columns',
                typeof value === 'number' ? value : parseInt(value),
                {
                  shouldValidate: true,
                },
              )
            }
            error={errors.columns?.message}
          />
        </Flex>
      </form>
      <Flex
        align={'center'}
        justify={'flex-start'}
        flex={'0 0 fit-content'}
        gap={'md'}
        direction={'row'}
      >
        <Button variant="outline" color="red" onClick={() => setEditingItem()}>
          Cancel
        </Button>
        <Button form="grid-form" variant="filled" type="submit">
          Save
        </Button>
      </Flex>
    </>
  );
};
