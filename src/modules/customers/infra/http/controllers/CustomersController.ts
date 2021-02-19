import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateCustomerService from '@modules/customers/services/CreateCustomerService';
import { DeleteCustomerService } from '@modules/customers/services/DeleteCustomerService';

class CustomersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    const { company_id } = request.user;

    const createCustomer = container.resolve(CreateCustomerService);

    const customer = await createCustomer.execute({ name, company_id });

    return response.json(classToClass(customer));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCustomer = container.resolve(DeleteCustomerService);

    await deleteCustomer.execute({ id });

    return response.send();
  }
}

export default CustomersController;
