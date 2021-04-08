import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListUserCustomersService } from '@modules/customers/services/ListUserCustomersService';

export class UserCustomersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { company_id } = request.user;

    const listUserCustomers = container.resolve(ListUserCustomersService);

    const customers = await listUserCustomers.execute({ company_id });

    return response.json(customers);
  }
}
