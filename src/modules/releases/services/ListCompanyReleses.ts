import { injectable, inject } from 'tsyringe';

import IReleasesRepository from '@modules/releases/repositories/IReleasesRepository';
import ICompaniesRepository from '@modules/companies/repositories/ICompaniesRepository';

import Release from '@modules/releases/infra/typeorm/entities/Release';
import AppError from '@shared/errors/AppError';

interface IRequest {
  company_id: string;
}

@injectable()
class CreateReleaseService {
  constructor(
    @inject('ReleasesRepository')
    private releasesRepository: IReleasesRepository,

    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,
  ) {}

  public async execute({ company_id }: IRequest): Promise<Release[]> {
    const company = await this.companiesRepository.findById(company_id);

    if (!company) {
      throw new AppError('Companie does not exist.');
    }

    const releases = await this.releasesRepository.findByCompany(company_id);

    return releases;
  }
}

export default CreateReleaseService;
