import { injectable, inject } from 'tsyringe';

import { IPhoneNumbersRepository } from '@modules/numbers/repositories/IPhoneNumbersRepository';

interface IRequest {
  number_id: string;
}

@injectable()
export class DeletePhoneNumberService {
  constructor(
    @inject('PhoneNumbersRepository')
    private phoneNumbersRepository: IPhoneNumbersRepository,
  ) {}

  public async execute({ number_id }: IRequest): Promise<void> {
    await this.phoneNumbersRepository.delete(number_id);
  }
}
