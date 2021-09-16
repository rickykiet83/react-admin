import { IUser } from './../../models/user.model';
export const setUser = (user: IUser) => ({
  type: 'SET_USER',
})
