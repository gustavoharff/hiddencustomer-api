import { UserToken } from '../infra/typeorm/entities/UserToken';

export interface IUserTokensRepository {
  generate(user_id: string): Promise<UserToken>;
  findByToken(token: number): Promise<UserToken | undefined>;
  deleteToken(token_id: string): Promise<void>;
}
