import { injectable, inject } from 'tsyringe';

import IReleasesRepository from '@modules/releases/repositories/IReleasesRepository';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';

import Release from '@modules/releases/infra/typeorm/entities/Release';
import AppError from '@shared/errors/AppError';

interface IRequest {
  name: string;
  customer_id: string;
  company_id: string;
}

interface IReleaseWithCounters extends Release {
  interval: Date[];
  dates_counter: number;
  groups_counter: number;
}

@injectable()
class CreateReleaseService {
  constructor(
    @inject('ReleasesRepository')
    private releasesRepository: IReleasesRepository,

    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({
    name,
    customer_id,
    company_id,
  }: IRequest): Promise<IReleaseWithCounters> {
    const customer = await this.customersRepository.findById(customer_id);

    if (!customer) {
      throw new AppError('Customer  does not exist.');
    }

    const release = await this.releasesRepository.create({
      name,
      customer_id,
      company_id,
    });

    return { ...release, dates_counter: 0, groups_counter: 0, interval: [] };
  }
}

export default CreateReleaseService;
