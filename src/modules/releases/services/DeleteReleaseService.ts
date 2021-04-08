import { injectable, inject } from 'tsyringe';

import { IReleasesRepository } from '@modules/releases/repositories/IReleasesRepository';

import { AppError } from '@shared/errors/AppError';

interface IRequest {
  id: string;
}

@injectable()
export class DeleteReleaseService {
  constructor(
    @inject('ReleasesRepository')
    private releasesRepository: IReleasesRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    const release = await this.releasesRepository.findById(id);

    if (!release) {
      throw new AppError('Release  does not exist.');
    }

    await this.releasesRepository.delete(id);
  }
}
