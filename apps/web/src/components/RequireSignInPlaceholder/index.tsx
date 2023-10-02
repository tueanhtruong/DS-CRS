import { Button, Flex, Title } from '@mantine/core';
import React from 'react';

export type RequireSignInPlaceholderProps = {
  onSignIn: () => void;
};

export const RequireSignInPlaceholder: React.FC<
  RequireSignInPlaceholderProps
> = ({ onSignIn }) => {
  return (
    <Flex
      className="fixed inset-0 z-10 backdrop-blur-sm"
      align={'center'}
      justify={'center'}
      direction={'column'}
      gap={16}
    >
      <Title order={3}>Please sign in to access this page</Title>
      <Button onClick={onSignIn}>Sign In</Button>
    </Flex>
  );
};
