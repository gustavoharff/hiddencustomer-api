import { injectable, inject } from 'tsyringe';

import { IReleasesRepository } from '@modules/releases/repositories/IReleasesRepository';

import { AppError } from '@shared/errors/AppError';
import { IReleaseGroupsRepository } from '../repositories/IReleaseGroupsRepository';
import { ReleaseGroup } from '../infra/typeorm/entities/ReleaseGroup';

interface IRequest {
  release_id: string;
}

@injectable()
export class ListReleaseGroupsService {
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
