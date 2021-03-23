import { injectable, inject } from 'tsyringe';

import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import ICompaniesRepository from '@modules/companies/repositories/ICompaniesRepository';

import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import AppError from '@shared/errors/AppError';
import IReleasesRepository from '@modules/releases/repositories/IReleasesRepository';

interface IRequest {
  company_id: string;
}

interface ICustomerWithCounter extends Customer {
  releases_counter: number;
}

@injectable()
class ListUserCustomersService {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,

    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,

    @inject('ReleasesRepository')
    private releasesRepository: IReleasesRepository,
  ) {}

  public async execute({
    company_id,
  }: IRequest): Promise<ICustomerWithCounter[]> {
    const company = await this.companiesRepository.findById(company_id);

    if (!company) {
      throw new AppError('Company does not exist.');
    }

    const customers = await this.customersRepository.findByCompany(company_id);

    const customersWithCounter = await Promise.all(
      customers.map(async customer => {
        const releases = await this.releasesRepository.findByCustomer(
          customer.id,
        );

        return {
          ...customer,
          releases_counter: releases.length,
        };
      }),
    );

    return customersWithCounter;
  }
}

export default ListUserCustomersService;
