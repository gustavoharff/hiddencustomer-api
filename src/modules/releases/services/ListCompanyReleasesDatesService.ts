import { injectable, inject } from 'tsyringe';

import { IReleaseDatesRepository } from '@modules/releases/repositories/IReleaseDatesRepository';

import { ReleaseDate } from '@modules/releases/infra/typeorm/entities/ReleaseDate';

interface IRequest {
  company_id: string;
}

@injectable()
class ListCompanyReleasesDatesService {
  constructor(
    @inject('ReleaseDatesRepository')
    private releaseDatesRepository: IReleaseDatesRepository,
  ) {}

  public async execute({ company_id }: IRequest): Promise<ReleaseDate[]> {
    const dates = await this.releaseDatesRepository.findByCompany(company_id);

    return dates;
  }
}

export { ListCompanyReleasesDatesService };
