import { injectable, inject } from 'tsyringe';

import IReleasesRepository from '@modules/releases/repositories/IReleasesRepository';

import { IReleaseGroupsRepository } from '@modules/releases/repositories/IReleaseGroupsRepository';

import AppError from '@shared/errors/AppError';

import { ReleaseGroup } from '../infra/typeorm/entities/ReleaseGroup';

type IRequest = {
  release_id: string;
  name: string;
  type: 'whatsapp' | 'discord' | 'telegram';
};

@injectable()
class CreateReleaseGroupService {
  constructor(
    @inject('ReleasesRepository')
    private releasesRepository: IReleasesRepository,

    @inject('ReleaseGroupsRepository')
    private releaseGroupsRepository: IReleaseGroupsRepository,
  ) {}

  public async execute({
    release_id,
    name,
    type,
  }: IRequest): Promise<ReleaseGroup> {
    const release = await this.releasesRepository.findById(release_id);

    if (!release) {
      throw new AppError('Release does not exist.');
    }

    const releaseGroup = await this.releaseGroupsRepository.create({
      name,
      type,
      release_id,
    });

    return releaseGroup;
  }
}

export { CreateReleaseGroupService };
