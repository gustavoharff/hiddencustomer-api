import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

import { IReleaseGroupsRepository } from '../repositories/IReleaseGroupsRepository';
import { ReleaseGroup } from '../infra/typeorm/entities/ReleaseGroup';
import { IReleaseDatesRepository } from '../repositories/IReleaseDatesRepository';

interface IRequest {
  id: string;
  name: string;
  type: 'whatsapp' | 'discord' | 'telegram';
  release_date_id?: string;
}

@injectable()
export class UpdateReleaseGroupService {
  constructor(
    @inject('ReleaseGroupsRepository')
    private releaseGroupsRepository: IReleaseGroupsRepository,

    @inject('ReleaseDatesRepository')
    private releaseDatesRepository: IReleaseDatesRepository,
  ) {}

  public async execute({
    id,
    name,
    type,
    release_date_id,
  }: IRequest): Promise<ReleaseGroup> {
    const group = await this.releaseGroupsRepository.findById(id);

    if (!group) {
      throw new AppError('Group does not exist.');
    }

    if (release_date_id) {
      const date = await this.releaseDatesRepository.findById(release_date_id);

      if (!date) {
        throw new AppError('Date does not exist.');
      }

      if (release_date_id !== undefined) {
        group.release_date_id = release_date_id;
        group.release_date = date;
      }
    }

    group.name = name;

    group.type = type;

    await this.releaseGroupsRepository.save(group);

    return group;
  }
}
