import { injectable, inject } from 'tsyringe';

import IReleasesRepository from '@modules/releases/repositories/IReleasesRepository';
import { IReleaseDatesRepository } from '@modules/releases/repositories/IReleaseDatesRepository';

import AppError from '@shared/errors/AppError';
import { ReleaseDate } from '../infra/typeorm/entities/ReleaseDate';

interface IRequest {
  release_id: string;
  date: string;
}

@injectable()
class CreateReleaseDateService {
  constructor(
    @inject('ReleasesRepository')
    private releasesRepository: IReleasesRepository,

    @inject('ReleaseDatesRepository')
    private releaseDatesRepository: IReleaseDatesRepository,
  ) {}

  public async execute({ release_id, date }: IRequest): Promise<ReleaseDate> {
    const release = await this.releasesRepository.findById(release_id);

    if (!release) {
      throw new AppError('Release does not exist.');
    }

    const releaseDate = await this.releaseDatesRepository.create({
      date,
      release_id,
    });

    return releaseDate;
  }
}

export { CreateReleaseDateService };
