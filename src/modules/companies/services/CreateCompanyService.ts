import { injectable, inject } from 'tsyringe';

import ICompaniesRepository from '@modules/companies/repositories/ICompaniesRepository';

import Company from '@modules/companies/infra/typeorm/entities/Company';
import AppError from '@shared/errors/AppError';

interface IRequest {
  name: string;
  permission: 'admin' | 'client' | 'user';
}

@injectable()
class CreateCompanyService {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,
  ) {}

  public async execute({ name, permission }: IRequest): Promise<Company> {
    if (permission !== 'admin') {
      throw new AppError(
        "You don't have permission to execute this action.",
        401,
      );
    }

    const company = await this.companiesRepository.create(name);

    return company;
  }
}

export default CreateCompanyService;
