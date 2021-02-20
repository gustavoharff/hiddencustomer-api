import { injectable, inject } from 'tsyringe';

import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';

import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import AppError from '@shared/errors/AppError';

interface IRequest {
  customer_id: string;
}

@injectable()
class ListCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ customer_id }: IRequest): Promise<Customer> {
    const customer = await this.customersRepository.findById(customer_id);

    if (!customer) {
      throw new AppError('Customer does not exist.');
    }

    return customer;
  }
}

export { ListCustomerService };
