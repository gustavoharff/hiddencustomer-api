import { injectable, inject } from 'tsyringe';

import ICompaniesRepository from '@modules/companies/repositories/ICompaniesRepository';

import Company from '@modules/companies/infra/typeorm/entities/Company';

import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
  name: string;
  permission: 'admin' | 'client' | 'user';
}

@injectable()
class CreateCompanyService {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,
  ) {}

  public async execute({ id, name, permission }: IRequest): Promise<Company> {
    if (permission !== 'admin') {
      throw new AppError(
        "You don't have permission to execute this action.",
        401,
      );
    }

    const company = await this.companiesRepository.findById(id);

    if (!company) {
      throw new AppError('Company does not exists!');
    }

    company.name = name;

    await this.companiesRepository.save(company);

    return company;
  }
}

export default CreateCompanyService;
