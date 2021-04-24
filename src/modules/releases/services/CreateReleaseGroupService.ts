import { injectable, inject } from 'tsyringe';

import { IReleasesRepository } from '@modules/releases/repositories/IReleasesRepository';

import { IReleaseGroupsRepository } from '@modules/releases/repositories/IReleaseGroupsRepository';

import { AppError } from '@shared/errors/AppError';

import { ReleaseGroup } from '../infra/typeorm/entities/ReleaseGroup';

interface IRequest {
  name: string;
  type: 'whatsapp' | 'discord' | 'telegram';
  release_date_id?: string;
  release_id: string;
  company_id: string;
}

@injectable()
export class CreateReleaseGroupService {
  constructor(
    @inject('ReleasesRepository')
    private releasesRepository: IReleasesRepository,

    @inject('ReleaseGroupsRepository')
    private releaseGroupsRepository: IReleaseGroupsRepository,
  ) {}

  public async execute({
    name,
    type,
    release_date_id,
    release_id,
    company_id,
  }: IRequest): Promise<ReleaseGroup> {
    const release = await this.releasesRepository.findById(release_id);

    if (!release) {
      throw new AppError('Release does not exist.');
    }

    const releaseGroup = await this.releaseGroupsRepository.create({
      name,
      type,
      release_date_id,
      release_id,
      company_id,
    });

    return releaseGroup;
  }
}
