export interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  company_id: string;
  permission: 'user' | 'client' | 'admin';
  active: boolean;
}
