import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import { ListCustomerService } from '@modules/customers/services/ListCustomerService';

class CustomerController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const listCustomer = container.resolve(ListCustomerService);

    const customer = await listCustomer.execute({ customer_id: id });

    return response.json(classToClass(customer));
  }
}

export { CustomerController };
