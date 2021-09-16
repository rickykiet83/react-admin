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
  constructor(id: number | null = null, first_name = '', last_name = '', email: string = '') {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
  }
}
