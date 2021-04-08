import { injectable, inject } from 'tsyringe';

import { ICompaniesRepository } from '@modules/companies/repositories/ICompaniesRepository';

import { Company } from '@modules/companies/infra/typeorm/entities/Company';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  company_id: string;
}

@injectable()
export class ListUserCompanyService {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,
  ) {}

  public async execute({ company_id }: IRequest): Promise<Company> {
    const company = await this.companiesRepository.findById(company_id);

    if (!company) {
      throw new AppError('Company does not exists.');
    }

    return company;
  }
}
