import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

import { User } from '@modules/users/infra/typeorm/entities/User';

import { IUsersRepository } from '../repositories/IUsersRepository';

import { IHashProvider } from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  user_id: string;
  old_password: string;
  password: string;
}

@injectable()
export class UpdateUserPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    old_password,
    password,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.');
    }

    if (password && !old_password) {
      throw new AppError(
        'You need to inform the old password to set a new password.',
      );
    }

    if (password && old_password) {
      const checkOldPassword = await this.hashProvider.compareHash(
        old_password,
        user.password,
      );

      if (!checkOldPassword) {
        throw new AppError('Old password does not match.');
      }

      user.password = await this.hashProvider.generateHash(password);
    }

    await this.usersRepository.save(user);

    return user;
  }
}
