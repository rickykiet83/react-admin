import { User } from './../../models/user.model';
export const setUser = (user: User) => {
  return {
    type: 'SET_USER',
    user
  }
}
