export interface IUser {
  id: number | null;
  first_name: string;
  last_name: string;
  email: string;
  password?: string | null;
}

export class User implements IUser {
  id: number | null = null;
  first_name: string = '';
  last_name: string = '';
  email: string = '';
  password?: null;
}
