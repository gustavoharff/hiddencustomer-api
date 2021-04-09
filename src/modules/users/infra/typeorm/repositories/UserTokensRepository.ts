import { getRepository, Repository } from 'typeorm';

import { IUserTokensRepository } from '@modules/users/repositories/IUserTokensRepository';
import { AppError } from '@shared/errors/AppError';
import { UserToken } from '../entities/UserToken';

export class UserTokensRepository implements IUserTokensRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  public async findByToken(token: number): Promise<UserToken | undefined> {
    const userToken = await this.ormRepository.findOne({
      where: {
        token,
      },
    });

    return userToken;
  }

  public async generate(user_id: string): Promise<UserToken> {
    const min = Math.ceil(10000);
    const max = Math.floor(99999);

    const userToken = this.ormRepository.create({
      user_id,
      token: Math.floor(Math.random() * (max - min)) + min,
    });

    await this.ormRepository.save(userToken);

    return userToken;
  }

  public async deleteToken(token_id: string): Promise<void> {
    const token = await this.ormRepository.findOne(token_id);

    if (!token) {
      throw new AppError('Token does not exists.');
    }

    await this.ormRepository.delete(token.id);
  }
}
