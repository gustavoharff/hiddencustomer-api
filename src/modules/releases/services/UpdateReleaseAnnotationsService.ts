import { injectable, inject } from 'tsyringe';

import IReleasesRepository from '@modules/releases/repositories/IReleasesRepository';

import AppError from '@shared/errors/AppError';

import Release from '../infra/typeorm/entities/Release';

interface IRequest {
  id: string;
  annotations: string | undefined;
}

@injectable()
class UpdateReleaseAnnotationsService {
  constructor(
    @inject('ReleasesRepository')
    private releasesRepository: IReleasesRepository,
  ) {}

  public async execute({ id, annotations }: IRequest): Promise<Release> {
    const release = await this.releasesRepository.findById(id);

    if (!release) {
      throw new AppError('Release  does not exist.');
    }

    if (!annotations) {
      release.annotations = '';
    } else {
      release.annotations = annotations;
    }

    await this.releasesRepository.save(release);

    return release;
  }
}

export { UpdateReleaseAnnotationsService };
