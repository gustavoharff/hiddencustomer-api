import { injectable, inject } from 'tsyringe';
import { isAfter, addHours } from 'date-fns';

import { AppError } from '@shared/errors/AppError';

import { IUsersRepository } from '../repositories/IUsersRepository';
import { IUserTokensRepository } from '../repositories/IUserTokensRepository';

interface IRequest {
  token: number;
}

@injectable()
export class CheckResetPasswordTokenService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  public async execute({ token }: IRequest): Promise<void> {
    const user_token = await this.userTokensRepository.findByToken(token);

    if (!user_token) {
      throw new AppError('Token não existe.');
    }

    const user = await this.usersRepository.findById(user_token.user_id);

    if (!user) {
      throw new AppError('Usuário não existe.');
    }

    const tokenCreatedAt = user_token.created_at;

    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expirado.');
    }
  }
}
