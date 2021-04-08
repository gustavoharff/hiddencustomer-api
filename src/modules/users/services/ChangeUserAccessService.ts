import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

import { User } from '../infra/typeorm/entities/User';
import { IUsersRepository } from '../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  active: boolean;
}

@injectable()
export class ChangeUserAccessService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id, active }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.');
    }

    user.active = active;

    await this.usersRepository.save(user);

    return user;
  }
}