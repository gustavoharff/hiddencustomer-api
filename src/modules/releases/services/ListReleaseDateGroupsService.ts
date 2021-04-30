import { injectable, inject } from 'tsyringe';

import { IReleaseGroupsRepository } from '@modules/releases/repositories/IReleaseGroupsRepository';

import { ReleaseGroup } from '@modules/releases/infra/typeorm/entities/ReleaseGroup';

interface IRequest {
  date_id: string;
}

@injectable()
export class ListReleaseDateGroupsService {
  constructor(
    @inject('ReleaseGroupsRepository')
    private releaseGroupsRepository: IReleaseGroupsRepository,
  ) {}

  public async execute({ date_id }: IRequest): Promise<ReleaseGroup[]> {
    const groups = await this.releaseGroupsRepository.findByDate(date_id);

    return groups;
  }
}
