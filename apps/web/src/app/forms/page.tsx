'use client';

import { Grid } from '@mantine/core';
import { useProtectedRoute } from 'src/modules';

export default function Store() {
  const { PlaceholderElement } = useProtectedRoute();
  return (
    <>
      <Grid>
        <Grid.Col span={4}></Grid.Col>
        <Grid.Col span={8}></Grid.Col>
      </Grid>
      {PlaceholderElement}
    </>
  );
}
