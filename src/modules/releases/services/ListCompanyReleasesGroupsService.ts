import { injectable, inject } from 'tsyringe';

import { IReleaseGroupsRepository } from '@modules/releases/repositories/IReleaseGroupsRepository';

import { ReleaseGroup } from '@modules/releases/infra/typeorm/entities/ReleaseGroup';

interface IRequest {
  company_id: string;
}

@injectable()
export class ListCompanyReleasesGroupsService {
  constructor(
    @inject('ReleaseGroupsRepository')
    private releaseGroupsRepository: IReleaseGroupsRepository,
  ) {}

  public async execute({ company_id }: IRequest): Promise<ReleaseGroup[]> {
    const groups = await this.releaseGroupsRepository.findByCompany(company_id);

    return groups;
  }
}
