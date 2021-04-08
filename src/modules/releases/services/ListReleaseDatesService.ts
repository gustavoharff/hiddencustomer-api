import { injectable, inject } from 'tsyringe';

import { IReleasesRepository } from '@modules/releases/repositories/IReleasesRepository';
import { IReleaseDatesRepository } from '@modules/releases/repositories/IReleaseDatesRepository';

import { ReleaseDate } from '@modules/releases/infra/typeorm/entities/ReleaseDate';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  release_id: string;
}

@injectable()
export class ListReleaseDatesService {
  constructor(
    @inject('ReleasesRepository')
    private releasesRepository: IReleasesRepository,

    @inject('ReleaseDatesRepository')
    private releaseDatesRepository: IReleaseDatesRepository,
  ) {}

  public async execute({ release_id }: IRequest): Promise<ReleaseDate[]> {
    const release = await this.releasesRepository.findById(release_id);

    if (!release) {
      throw new AppError('Release does not exist.');
    }

    const dates = await this.releaseDatesRepository.findByRelease(release.id);

    return dates;
  }
}
