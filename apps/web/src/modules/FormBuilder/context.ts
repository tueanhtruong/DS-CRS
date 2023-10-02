import React from 'react';
import { EnumValues, emptyFunction } from './provider';

export type GridBuilderType = {
  id: string;
  columns: number;
  refNames: { [key: string]: string };
};

export const SchemaTypes = {
  UI_SCHEMA: 'uiSchema',
  FORM_SCHEMA: 'formSchema',
} as const;

export type FormBuilderContextType = {
  uiSchema: { [key: string]: GridBuilderType };
  editingItem?: {
    schema: EnumValues<typeof SchemaTypes>;
    id: string;
  };
  setEditingItem: (item?: {
    schema: EnumValues<typeof SchemaTypes>;
    id: string;
  }) => void;
  deleteItem: (item?: {
    schema: EnumValues<typeof SchemaTypes>;
    id: string;
  }) => void;
  handleUpsertItem: (schema: GridBuilderType) => void;
  selectedItem?: {
    schema: EnumValues<typeof SchemaTypes>;
    item: GridBuilderType;
  };
};

export const FormBuilderContext =
  React.createContext<FormBuilderContextType | null>({
    uiSchema: {},
    setEditingItem: emptyFunction,
    deleteItem: emptyFunction,
    handleUpsertItem: emptyFunction,
  });

export const FormBuilderContextProvider = FormBuilderContext.Provider;

export const useFormBuilderContext = () => {
  const context = React.useContext(FormBuilderContext);

  if (!context) {
    throw new Error(
      'useFormBuilderContext must be used within a FormBuilderProvider',
    );
  }

  return context;
};
