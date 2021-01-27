import { getRepository, Repository } from 'typeorm';
import { v4 } from 'uuid';

import IPermissionsRepository from '@modules/users/repositories/IPermissionsRepository';
import Permission from '@modules/users/infra/typeorm/entities/Permission';

class PermissionsRepository implements IPermissionsRepository {
  private ormRepository: Repository<Permission>;

  constructor() {
    this.ormRepository = getRepository(Permission);
  }

  public async create(name: string): Promise<Permission> {
    const permission = this.ormRepository.create({
      id: v4(),
      name,
    });

    await this.ormRepository.save(permission);

    return permission;
  }

  public async findById(id: string): Promise<Permission | undefined> {
    const permission = await this.ormRepository.findOne(id);

    return permission;
  }
}

export default PermissionsRepository;
