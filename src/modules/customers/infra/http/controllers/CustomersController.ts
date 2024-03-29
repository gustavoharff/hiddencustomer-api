import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCustomerService } from '@modules/customers/services/CreateCustomerService';

export class CustomersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    const { company_id } = request.user;

    const createCustomer = container.resolve(CreateCustomerService);

    const customer = await createCustomer.execute({ name, company_id });

    return response.json(customer);
  }
}
