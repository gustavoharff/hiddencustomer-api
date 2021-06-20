import { injectable, inject } from 'tsyringe';

import { IPhoneNumbersRepository } from '@modules/numbers/repositories/IPhoneNumbersRepository';

import { PhoneNumber } from '@modules/numbers/infra/typeorm/entities/PhoneNumber';

interface IRequest {
  user_id: string;
}

@injectable()
export class ListPhoneNumbersService {
  constructor(
    @inject('PhoneNumbersRepository')
    private phoneNumbersRepository: IPhoneNumbersRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<PhoneNumber[]> {
    const phoneNumbers = await this.phoneNumbersRepository.findByUser(user_id);

    return phoneNumbers;
  }
}
