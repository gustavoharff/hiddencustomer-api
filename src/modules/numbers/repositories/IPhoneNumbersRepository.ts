import { ICreatePhoneNumberDTO } from '../dtos/ICreatePhoneNumberDTO';

import { PhoneNumber } from '../infra/typeorm/entities/PhoneNumber';

export interface IPhoneNumbersRepository {
  create(data: ICreatePhoneNumberDTO): Promise<PhoneNumber>;
  delete(number_id: string): Promise<void>;
  findByUser(user_id: string): Promise<PhoneNumber[]>;
}
