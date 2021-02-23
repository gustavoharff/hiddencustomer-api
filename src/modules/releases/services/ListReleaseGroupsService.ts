import { injectable, inject } from 'tsyringe';

import IReleasesRepository from '@modules/releases/repositories/IReleasesRepository';

import { IReleaseGroupsRepository } from '@modules/releases/repositories/IReleaseGroupsRepository';

import { ReleaseGroup } from '@modules/releases/infra/typeorm/entities/ReleaseGroup';
import AppError from '@shared/errors/AppError';

interface IRequest {
  release_id: string;
}

@injectable()
class ListReleaseGroupsService {
  constructor(
    @inject('ReleasesRepository')
    private releasesRepository: IReleasesRepository,

    @inject('ReleaseGroupsRepository')
    private releaseGroupsRepository: IReleaseGroupsRepository,
  ) {}

  public async execute({ release_id }: IRequest): Promise<ReleaseGroup[]> {
    const release = await this.releasesRepository.findById(release_id);

    if (!release) {
      throw new AppError('Release does not exist.');
    }

    const groups = await this.releaseGroupsRepository.findByRelease(release.id);

    return groups;
  }
}

export { ListReleaseGroupsService };
