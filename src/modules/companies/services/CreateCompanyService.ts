import { injectable, inject } from 'tsyringe';

import ICompaniesRepository from '@modules/companies/repositories/ICompaniesRepository';

import Company from '@modules/companies/infra/typeorm/entities/Company';

@injectable()
class CreateCompanyService {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,
  ) {}

  public async execute(name: string): Promise<Company> {
    const company = await this.companiesRepository.create(name);

    return company;
  }
}

export default CreateCompanyService;
