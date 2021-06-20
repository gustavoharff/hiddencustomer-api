import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListPhoneNumbersService } from '../../../services/ListPhoneNumbersService';
import { CreatePhoneNumberService } from '../../../services/CreatePhoneNumberService';
import { DeletePhoneNumberService } from '../../../services/DeletePhoneNumberService';

export class PhoneNumbersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const listPhoneNumbers = container.resolve(ListPhoneNumbersService);

    const phoneNumbers = await listPhoneNumbers.execute({
      user_id: id,
    });

    return response.json(phoneNumbers);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, phone_number } = request.body;
    const { id } = request.user;

    const createPhoneNumber = container.resolve(CreatePhoneNumberService);

    const phoneNumber = await createPhoneNumber.execute({
      name,
      phone_number,
      user_id: id,
    });

    return response.json(phoneNumber);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deletePhoneNumber = container.resolve(DeletePhoneNumberService);

    await deletePhoneNumber.execute({
      number_id: id,
    });

    return response.send();
  }
}
