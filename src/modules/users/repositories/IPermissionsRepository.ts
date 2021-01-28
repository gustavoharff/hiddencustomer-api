import Permission from '@modules/users/infra/typeorm/entities/Permission';

export default interface IPermissionsRepository {
  create(name: string): Promise<Permission>;
  findById(id: string): Promise<Permission | undefined>;
}
