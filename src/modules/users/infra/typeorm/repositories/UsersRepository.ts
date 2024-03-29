import { getRepository, Repository } from 'typeorm';

import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { User } from '@modules/users/infra/typeorm/entities/User';

export class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create({
    name,
    email,
    password,
    company_id,
    permission,
    active,
  }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({
      name,
      email,
      password,
      permission,
      active,
      company_id,
    });

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id, {
      relations: ['company'],
    });

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { email } });

    return user;
  }

  public async findAll(): Promise<User[]> {
    const users = await this.ormRepository.find({ relations: ['company'] });

    return users;
  }

  public async findByCompany(company_id: string): Promise<User[]> {
    const users = await this.ormRepository.find({ where: { company_id } });

    return users;
  }
}
