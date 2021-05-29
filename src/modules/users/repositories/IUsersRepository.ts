import { User } from '../infra/typeorm/entities/User';
import { ICreateUserDTO } from '../dtos/ICreateUserDTO';

export interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  findAll(): Promise<User[]>;
  findByEmail(email: string): Promise<User | undefined>;
  findByCompany(company_id: string): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
  save(user: User): Promise<User>;
}
