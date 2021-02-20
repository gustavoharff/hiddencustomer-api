import { injectable, inject } from 'tsyringe';

import IReleasesRepository from '@modules/releases/repositories/IReleasesRepository';

import Release from '@modules/releases/infra/typeorm/entities/Release';
import AppError from '@shared/errors/AppError';

interface IRequest {
  release_id: string;
}

@injectable()
class ListReleaseService {
  constructor(
    @inject('ReleasesRepository')
    private releasesRepository: IReleasesRepository,
  ) {}

  public async execute({ release_id }: IRequest): Promise<Release> {
    const release = await this.releasesRepository.findById(release_id);

    if (!release) {
      throw new AppError('Release does not exist.');
    }

    return release;
  }
}

export { ListReleaseService };
