import { primaryKey } from '@mswjs/data';

export const userModel = {
  user: {
    id: primaryKey(String),
    username: String,
    password: String,
    firstName: String,
    lastName: String,
  },
};