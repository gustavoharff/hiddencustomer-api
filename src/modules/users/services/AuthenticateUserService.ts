import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';

import { authConfig } from '@config/auth';

import { AppError } from '@shared/errors/AppError';

import { IUsersRepository } from '../repositories/IUsersRepository';

import { User } from '../infra/typeorm/entities/User';

import { IHashProvider } from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
export class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    if (!user.active) {
      throw new AppError('User without permission to access the system.', 440);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const subject = JSON.stringify({
      user: {
        id: user.id,
        permission: user.permission,
        company_id: user.company_id,
      },
    });

    const token = sign({}, secret, {
      subject,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}
