import { injectable, inject } from 'tsyringe';

import { IReleaseDatesRepository } from '@modules/releases/repositories/IReleaseDatesRepository';

import { AppError } from '@shared/errors/AppError';

interface IRequest {
  id: string;
}

@injectable()
export class DeleteReleaseDateService {
  constructor(
    @inject('ReleaseDatesRepository')
    private releaseDatesRepository: IReleaseDatesRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    const date = await this.releaseDatesRepository.findById(id);

    if (!date) {
      throw new AppError('Release date does not exist.');
    }

    await this.releaseDatesRepository.delete(id);
  }
}
