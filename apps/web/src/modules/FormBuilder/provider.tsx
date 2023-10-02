import React, { PropsWithChildren } from 'react';
import { makeAGridItem } from 'src/modules/FormBuilder/makers';
import {
  FormBuilderContextProvider,
  FormBuilderContextType,
  GridBuilderType,
  SchemaTypes,
} from './context';

export type EnumValues<T> = T[keyof T];

export const FormActionType = {
  UPSERT: 'upsert',
  EDIT: 'edit',
  DELETE: 'delete',
} as const;

type FormAction = {
  type: EnumValues<typeof FormActionType>;
  payload: Partial<
    FormBuilderContextType & {
      deletingItem: { schema: EnumValues<typeof SchemaTypes>; id: string };
    } & { schema: GridBuilderType }
  >;
};

const reducer = (
  state: FormBuilderContextType,
  action: FormAction,
): FormBuilderContextType => {
  switch (action.type) {
    case FormActionType.UPSERT:
      const { uiSchema } = state;
      const newSchema: GridBuilderType | undefined = action.payload.schema;
      if (newSchema) uiSchema[newSchema.id] = newSchema;
      return { ...state, uiSchema };

    case FormActionType.EDIT:
      const { editingItem } = action.payload;

      if (editingItem) {
        const { schema, id } = editingItem;

        if (schema && id) {
          const schemaItems: { [key: string]: GridBuilderType } =
            schema === 'uiSchema' ? state.uiSchema : {};
          return {
            ...state,
            editingItem: { schema, id },
            selectedItem: {
              schema,
              item: schemaItems[id] as GridBuilderType,
            },
          };
        }
      }

      return { ...state, editingItem: undefined, selectedItem: undefined };
    case FormActionType.DELETE:
      const { deletingItem } = action.payload;
      if (deletingItem) {
        const { uiSchema } = state;
        delete uiSchema[deletingItem.id];
        return {
          ...state,
          uiSchema,
        };
      }
    default:
      return state;
  }
};

export const emptyFunction = (...args: any[]) => {};

export const FormBuilderProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const initSchema = React.useMemo(() => makeAGridItem(), []);
  const [state, dispatch] = React.useReducer(reducer, {
    uiSchema: { [initSchema.id]: initSchema },
    setEditingItem: emptyFunction,
    deleteItem: emptyFunction,
    handleUpsertItem: emptyFunction,
  });

  const setEditingItem = (item?: {
    schema: EnumValues<typeof SchemaTypes>;
    id: string;
  }) => {
    dispatch({
      type: FormActionType.EDIT,
      payload: item ? { editingItem: item } : {},
    });
  };

  const handleUpsertItem = (schema: GridBuilderType) => {
    dispatch({
      type: FormActionType.UPSERT,
      payload: { schema },
    });
  };

  const deleteItem = (item?: {
    schema: EnumValues<typeof SchemaTypes>;
    id: string;
  }) => {
    dispatch({
      type: FormActionType.DELETE,
      payload: item ? { deletingItem: item } : {},
    });
  };

  return (
    <FormBuilderContextProvider
      value={{
        ...state,
        handleUpsertItem,
        deleteItem,
        setEditingItem,
      }}
    >
      {children}
    </FormBuilderContextProvider>
  );
};
