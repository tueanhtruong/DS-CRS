import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Flex, Text, TextInput, Title } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { FaRegUser } from 'react-icons/fa';
import { authentication, saveToLocalStorage, useInitSignIn } from 'src/modules';
import * as Yup from 'yup';

type SignInForm = {
  username: string;
};

const schema = Yup.object({
  username: Yup.string().required(),
});

export const SignIn: React.FC = () => {
  const { isPending, signIn } = useInitSignIn({
    onSuccess({ data }) {
      saveToLocalStorage('token', data.access_token);
      authentication({ isAuthenticated: true, openSignIn: false });
    },
    onError(error) {
      setError('username', {
        message: error.message ?? 'Username is not correct!',
      });
    },
  });
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignInForm>({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: SignInForm) => {
    signIn(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Title className="text-primary-900" order={3}>
        Sign in
      </Title>
      <Flex gap={'xs'} align={'center'}>
        <Text fw={600} className="text-gray-500" size="sm">
          Don&apos;t have an account yet?
        </Text>
        <Button size="xs" variant="outline">
          Sign up
        </Button>
      </Flex>
      <TextInput
        className="mt-4"
        label="Username"
        placeholder="Enter username"
        rightSection={<FaRegUser />}
        withAsterisk
        size="md"
        {...register('username')}
        error={errors.username?.message}
      />
      <Button className="mt-8 w-full" type="submit" loading={isPending}>
        Sign In
      </Button>
    </form>
  );
};
