import client from '../client';
import {
  USER_AUTH_URL,
  USER_BASE_URL,
  USER_LIST_SCHOOLS_URL,
  USER_REGISTER_URL,
} from './url.constants';
import {
  AuthResponseDto,
  CreateUserParams,
  GetAuthParams,
  GetSchoolsResponseDto,
} from './user.types';
import { User } from '@/types/User';

export async function createAuth(data: CreateUserParams): Promise<void> {
  const res = await client.post(USER_REGISTER_URL, data);
  return res.data;
}

export async function getAuth(data: GetAuthParams): Promise<AuthResponseDto> {
  const res = await client.post(USER_AUTH_URL, data);
  return res.data;
}

export async function getUser(): Promise<User> {
  const res = await client.get(USER_BASE_URL);
  return res.data;
}

export async function getSchools(): Promise<GetSchoolsResponseDto> {
  const res = await client.get(USER_LIST_SCHOOLS_URL);
  return res.data;
}
