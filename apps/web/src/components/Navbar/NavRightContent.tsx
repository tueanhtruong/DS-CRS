import { Avatar, Button, Flex, Menu, Text } from '@mantine/core';
import Link from 'next/link';
import React from 'react';
import { ROUTES } from 'src/constants';
import {
  AuthenticationAction,
  AuthenticationState,
  authentication,
  useGetMyProfile,
  useSignOut,
} from 'src/modules';

export const NavRightContent: React.FC = () => {
  const [state, setState] = React.useState<AuthenticationAction>({});
  const { data, isFetching } = useGetMyProfile({
    enabled: state.isAuthenticated === true,
  });
  const { signOut } = useSignOut();

  React.useEffect(() => {
    return AuthenticationState.subscribe(setState);
  }, []);

  const isShowAvatar = state.isAuthenticated && data;

  return isShowAvatar ? (
    <Flex gap={'md'} align={'center'}>
      <Menu shadow="md" position="bottom-end">
        <Menu.Target>
          <Avatar
            variant="filled"
            size={'lg'}
            className="cursor-pointer"
            src={
              'https://storage.googleapis.com/static-files-demo-app/9720037.jpg'
            }
          />
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>{data.data.displayName}</Menu.Label>
          <Menu.Divider />
          <Menu.Item>
            <Link href={ROUTES.forms}>
              <Text size="sm" c="blue">
                Forms
              </Text>
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link href={ROUTES.createForm}>
              <Text size="sm" c="blue">
                Create a Form
              </Text>
            </Link>
          </Menu.Item>
          <Menu.Item onClick={signOut} className="text-primary-900">
            <Text size="sm" fw={700}>
              Sign Out
            </Text>
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Flex>
  ) : (
    <Button
      onClick={() => authentication({ openSignIn: true })}
      loading={isFetching}
    >
      Sign In
    </Button>
  );
};
