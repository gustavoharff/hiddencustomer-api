import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

import { ICompaniesRepository } from '@modules/companies/repositories/ICompaniesRepository';
import { User } from '../infra/typeorm/entities/User';
import { IUsersRepository } from '../repositories/IUsersRepository';
import { IHashProvider } from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  password?: string;
  company_id: string;
  permission: 'client' | 'user' | 'admin';
}

@injectable()
export class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    password,
    company_id,
    permission,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.');
    }

    const company = await this.companiesRepository.findById(company_id);

    if (!company) {
      throw new AppError('Company not found.');
    }

    user.name = name;
    user.email = email;
    user.company = company;

    if (password) {
      user.password = await this.hashProvider.generateHash(password);
    }

    if (permission !== undefined && permission !== user.permission) {
      user.permission = permission;
    }

    await this.usersRepository.save(user);

    return user;
  }
}
