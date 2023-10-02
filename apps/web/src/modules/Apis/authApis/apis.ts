import { httpService, newAbortController } from 'src/modules';
import { AuthResponse, InitSignIn, InitSignUp, MyProfile } from './types';

const initLogin = (payload: Readonly<InitSignIn>) =>
  httpService.post<AuthResponse>('/users/login', payload, newAbortController());

const initRegister = (payload: Readonly<InitSignUp>) =>
  httpService.post('/users', payload, newAbortController());

const getMyProfile = () =>
  httpService.get<MyProfile>('/users/me', {}, newAbortController());

export { getMyProfile, initLogin, initRegister };
