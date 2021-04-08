import { injectable, inject } from 'tsyringe';

import { ICompaniesRepository } from '@modules/companies/repositories/ICompaniesRepository';

import { Company } from '@modules/companies/infra/typeorm/entities/Company';

interface IRequest {
  name: string;
}

@injectable()
export class CreateCompanyService {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,
  ) {}

  public async execute({ name }: IRequest): Promise<Company> {
    const company = await this.companiesRepository.create(name);

    return company;
  }
}
