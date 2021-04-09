import { injectable, inject } from 'tsyringe';
import { isAfter, addHours } from 'date-fns';

import { AppError } from '@shared/errors/AppError';

import { IUsersRepository } from '../repositories/IUsersRepository';
import { IUserTokensRepository } from '../repositories/IUserTokensRepository';

import { IHashProvider } from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  token: number;
  password: string;
}

@injectable()
export class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ token, password }: IRequest): Promise<void> {
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

    user.password = await this.hashProvider.generateHash(password);

    await this.usersRepository.save(user);

    await this.userTokensRepository.deleteToken(user_token.id);
  }
}
