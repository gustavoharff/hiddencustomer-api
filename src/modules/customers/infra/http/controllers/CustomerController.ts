import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListCustomerService } from '@modules/customers/services/ListCustomerService';
import { UpdateCustomerService } from '@modules/customers/services/UpdateCustomerService';
import { DeleteCustomerService } from '@modules/customers/services/DeleteCustomerService';

export class CustomerController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const listCustomer = container.resolve(ListCustomerService);

    const customer = await listCustomer.execute({ customer_id: id });

    return response.json(customer);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name } = request.body;

    const updateCustomer = container.resolve(UpdateCustomerService);

    const customer = await updateCustomer.execute({ customer_id: id, name });

    return response.json(customer);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCustomer = container.resolve(DeleteCustomerService);

    await deleteCustomer.execute({ id });

    return response.send();
  }
}
