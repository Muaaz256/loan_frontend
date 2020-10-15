export interface UserFormInterface {
  username: string;
  password?: string | null;
  first_name: string;
  last_name: string;
  email: string | null;
}

export interface UserInterface {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string | null;
}
