import { Flex, Modal, Text, Title } from '@mantine/core';
import React from 'react';
import {
  AuthenticationAction,
  AuthenticationState,
  authentication,
} from 'src/modules';
import { SignIn } from './Forms';
import styles from './styles.module.scss';

export const AuthenticationModal: React.FC = () => {
  const [state, setState] = React.useState<AuthenticationAction>({});
  const { openSignIn, onSignUp } = state;
  const isOpen = Boolean(openSignIn || onSignUp);

  React.useEffect(() => {
    return AuthenticationState.subscribe(setState);
  }, []);

  return (
    <Modal.Root
      opened={isOpen}
      onClose={() => authentication({ openSignIn: false })}
    >
      <Modal.Overlay />
      <Modal.Content className={styles.authenticationModalContent}>
        <Modal.Body style={{ padding: 0 }} className="p-0">
          <Flex direction={'row'} wrap={'nowrap'}>
            <Flex
              direction={'column'}
              gap={'md'}
              className="flex-1 bg-primary-100 px-6 py-12"
            >
              <Title className="text-primary-900" order={1}>
                Welcome, Stranger!
              </Title>
              <Text>
                Ready to plunge into the depths of the unknown web? Pull up your
                adventurous socks and start exploring the treasures we have in
                store. Access the best of content, get to know real people and
                quench your thirst for knowledge.
              </Text>
            </Flex>
            <Flex direction={'column'} gap={'md'} className="flex-1 px-6 py-10">
              <SignIn />
            </Flex>
          </Flex>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};
