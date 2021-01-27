import Permission from '@modules/users/infra/typeorm/entities/Permission';

export default interface IUsersRepository {
  create(name: string): Promise<Permission>;
  findById(id: string): Promise<Permission | undefined>;
}
