import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';
import jwt from 'jsonwebtoken';

import { authConfig } from '@config/auth';

import { AppError } from '@shared/errors/AppError';

import { IUsersRepository } from '../repositories/IUsersRepository';

import { User } from '../infra/typeorm/entities/User';

interface IRequest {
  googleToken: string;
}

interface IResponse {
  user: User;
  token: string;
}

interface IGoogleTokenPayload {
  email: string;
  picture?: string;
}

@injectable()
export class GoogleAuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ googleToken }: IRequest): Promise<IResponse> {
    const decoded = jwt.decode(googleToken);

    const { email, picture } = decoded as IGoogleTokenPayload;

    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User not found combination.', 404);
    }

    if (!user.active) {
      throw new AppError('User without permission to access the system.', 401);
    }

    if (picture) {
      user.avatar_url = picture;
      this.usersRepository.save(user);
    }

    const subject = JSON.stringify({
      user: {
        id: user.id,
        permission: user.permission,
        company_id: user.company_id,
      },
    });

    const { secret, expiresIn } = authConfig.jwt;

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
