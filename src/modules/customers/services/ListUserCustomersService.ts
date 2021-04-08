import { injectable, inject } from 'tsyringe';

import { ICustomersRepository } from '@modules/customers/repositories/ICustomersRepository';
import { ICompaniesRepository } from '@modules/companies/repositories/ICompaniesRepository';

import { Customer } from '@modules/customers/infra/typeorm/entities/Customer';

import { AppError } from '@shared/errors/AppError';

interface IRequest {
  company_id: string;
}

@injectable()
export class ListUserCustomersService {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,

    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ company_id }: IRequest): Promise<Customer[]> {
    const company = await this.companiesRepository.findById(company_id);

    if (!company) {
      throw new AppError('Company does not exist.');
    }

    const customers = await this.customersRepository.findByCompany(company_id);

    return customers;
  }
}
