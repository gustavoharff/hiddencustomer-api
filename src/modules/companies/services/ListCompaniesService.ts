import { injectable, inject } from 'tsyringe';

import { ICompaniesRepository } from '@modules/companies/repositories/ICompaniesRepository';

import { Company } from '@modules/companies/infra/typeorm/entities/Company';

@injectable()
export class ListCompaniesService {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,
  ) {}

  public async execute(): Promise<Company[]> {
    const companies = await this.companiesRepository.findAll();

    return companies;
  }
}
