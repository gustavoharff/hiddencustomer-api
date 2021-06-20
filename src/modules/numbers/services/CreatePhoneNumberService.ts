import { injectable, inject } from 'tsyringe';

import { IPhoneNumbersRepository } from '@modules/numbers/repositories/IPhoneNumbersRepository';

import { PhoneNumber } from '@modules/numbers/infra/typeorm/entities/PhoneNumber';

interface IRequest {
  name: string;
  phone_number: string;
  user_id: string;
}

@injectable()
export class CreatePhoneNumberService {
  constructor(
    @inject('PhoneNumbersRepository')
    private phoneNumbersRepository: IPhoneNumbersRepository,
  ) {}

  public async execute({
    name,
    phone_number,
    user_id,
  }: IRequest): Promise<PhoneNumber> {
    const phoneNumber = await this.phoneNumbersRepository.create({
      name,
      phone_number,
      user_id,
    });

    return phoneNumber;
  }
}
