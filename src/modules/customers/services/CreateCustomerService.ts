import { injectable, inject } from 'tsyringe';

import ICompaniesRepository from '@modules/companies/repositories/ICompaniesRepository';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';

import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import AppError from '@shared/errors/AppError';

interface IRequest {
  name: string;
  company_id: string;
}

@injectable()
class CreateCustomerService {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,

    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ name, company_id }: IRequest): Promise<Customer> {
    const company = await this.companiesRepository.findById(company_id);

    if (!company) {
      throw new AppError('Company  does not exist.');
    }

    const customer = await this.customersRepository.create({
      name,
      company_id,
    });

    return customer;
  }
}

export default CreateCustomerService;
