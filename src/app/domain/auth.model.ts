import { User } from './index';
import { Err } from './index';
export interface Auth {
  user?: User;
  userId?: string;
  token?: string;
  err?: Err;
}