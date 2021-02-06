import Customer from '@modules/customers/infra/typeorm/entities/Customer';

import ICreateCustomerDTO from '@modules/customers/dtos/ICreateCustomerDTO';

export default interface ICustomersRepository {
  create(data: ICreateCustomerDTO): Promise<Customer>;
  findById(id: string): Promise<Customer | undefined>;
  findByCompany(company_id: string): Promise<Customer[]>;
  save(customer: Customer): Promise<Customer>;
}
