import { injectable, inject } from 'tsyringe';

import Permission from '@modules/users/infra/typeorm/entities/Permission';
import IPermissionsRepository from '@modules/users/repositories/IPermissionsRepository';
import AppError from '@shared/errors/AppError';
import ICreatePermissionDTO from '../dtos/ICreatePermissionDTO';

@injectable()
class CreatePermissionService {
  constructor(
    @inject('PermissionsRepository')
    private permissionsRepository: IPermissionsRepository,
  ) {}

  public async execute({
    name,
    permission_id,
  }: ICreatePermissionDTO): Promise<Permission> {
    if (!permission_id) {
      throw new AppError("You don't have permission!", 401);
    }

    const checkedPermission = await this.permissionsRepository.findById(
      permission_id,
    );

    if (!checkedPermission) {
      throw new AppError('Permission does not exists!');
    }

    if (checkedPermission.name !== 'admin') {
      throw new AppError("You don't have permission!", 401);
    }

    const permission = await this.permissionsRepository.create(name);

    return permission;
  }
}

export default CreatePermissionService;
