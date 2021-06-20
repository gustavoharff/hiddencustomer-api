import { getRepository, Repository } from 'typeorm';

import { IPhoneNumbersRepository } from '@modules/numbers/repositories/IPhoneNumbersRepository';
import { PhoneNumber } from '@modules/numbers/infra/typeorm/entities/PhoneNumber';
import { ICreatePhoneNumberDTO } from '@modules/numbers/dtos/ICreatePhoneNumberDTO';

export class PhoneNumbersRepository implements IPhoneNumbersRepository {
  private ormRepository: Repository<PhoneNumber>;

  constructor() {
    this.ormRepository = getRepository(PhoneNumber);
  }

  public async create({
    name,
    phone_number,
    user_id,
  }: ICreatePhoneNumberDTO): Promise<PhoneNumber> {
    const phoneNumber = this.ormRepository.create({
      name,
      phone_number,
      user_id,
    });

    await this.ormRepository.save(phoneNumber);

    return phoneNumber;
  }

  public async findByUser(user_id: string): Promise<PhoneNumber[]> {
    const phoneNumbers = await this.ormRepository.find({ where: { user_id } });

    return phoneNumbers;
  }

  public async delete(number_id: string): Promise<void> {
    this.ormRepository.delete(number_id);
  }
}
