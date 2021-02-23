import { injectable, inject } from 'tsyringe';

import { IReleaseGroupsRepository } from '@modules/releases/repositories/IReleaseGroupsRepository';

import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
}

@injectable()
class DeleteReleaseGroupService {
  constructor(
    @inject('ReleaseGroupsRepository')
    private releaseGroupsRepository: IReleaseGroupsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    const group = await this.releaseGroupsRepository.findById(id);

    if (!group) {
      throw new AppError('Release group does not exist.');
    }

    await this.releaseGroupsRepository.delete(id);
  }
}

export { DeleteReleaseGroupService };
