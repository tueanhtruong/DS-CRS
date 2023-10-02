'use client';
import {
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import {
  ApiResponseType,
  authentication,
  responseWrapper,
  saveToLocalStorage,
} from 'src/modules';
import { getMyProfile, initLogin, initRegister } from './apis';
import { AuthResponse, InitSignIn, InitSignUp, MyProfile } from './types';

export function useSignOut() {
  const signOut = () => {
    saveToLocalStorage('token', null);
    authentication({ isAuthenticated: false });
  };
  return {
    signOut,
  };
}

export function useInitSignIn(
  options?: UseMutationOptions<
    ApiResponseType<AuthResponse>,
    Error,
    InitSignIn
  >,
) {
  const { data, mutate, error, reset, isPending } = useMutation<
    ApiResponseType<AuthResponse>,
    Error,
    InitSignIn
  >({
    mutationFn: (payload) =>
      responseWrapper<ApiResponseType<AuthResponse>>(initLogin, [payload]),
    ...options,
  });
  return {
    data,
    signIn: mutate,
    isPending,
    error,
    reset,
  };
}

export function useInitSignUp(
  options?: UseMutationOptions<void, Error, InitSignUp>,
) {
  const { data, mutate, error, reset, isPending } = useMutation<
    void,
    Error,
    InitSignUp
  >({
    mutationFn: (payload) => responseWrapper<void>(initRegister, [payload]),
    ...options,
  });
  return {
    data,
    signUp: mutate,
    isPending,
    error,
    reset,
  };
}

export function useGetMyProfile(
  options?: Partial<
    UseQueryOptions<unknown, Error, ApiResponseType<MyProfile>>
  >,
) {
  const { data, error, refetch, isFetching } = useQuery<
    unknown,
    Error,
    ApiResponseType<MyProfile>
  >({
    queryKey: ['users', 'me'],
    queryFn: () => {
      return responseWrapper<ApiResponseType<MyProfile>>(getMyProfile);
    },
    ...options,
  });
  return {
    data,
    isFetching,
    error,
    refetch,
  };
}
