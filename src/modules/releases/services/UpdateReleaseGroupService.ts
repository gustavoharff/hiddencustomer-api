import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

import { IReleaseGroupsRepository } from '../repositories/IReleaseGroupsRepository';
import { ReleaseGroup } from '../infra/typeorm/entities/ReleaseGroup';

interface IRequest {
  id: string;
  name: string;
  type: 'whatsapp' | 'discord' | 'telegram';
}

@injectable()
export class UpdateReleaseGroupService {
  constructor(
    @inject('ReleaseGroupsRepository')
    private releaseGroupsRepository: IReleaseGroupsRepository,
  ) {}

  public async execute({ id, name, type }: IRequest): Promise<ReleaseGroup> {
    const group = await this.releaseGroupsRepository.findById(id);

    if (!group) {
      throw new AppError('Group does not exist.');
    }

    group.name = name;

    group.type = type;

    await this.releaseGroupsRepository.save(group);

    return group;
  }
}
