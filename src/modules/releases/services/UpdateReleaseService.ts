import { injectable, inject } from 'tsyringe';

import IReleasesRepository from '@modules/releases/repositories/IReleasesRepository';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';

import AppError from '@shared/errors/AppError';

import Release from '../infra/typeorm/entities/Release';

interface IRequest {
  id: string;
  name: string;
  customer_id: string;
  paid: boolean;
}

@injectable()
class UpdateReleaseService {
  constructor(
    @inject('ReleasesRepository')
    private releasesRepository: IReleasesRepository,

    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({
    id,
    name,
    paid,
    customer_id,
  }: IRequest): Promise<Release> {
    const release = await this.releasesRepository.findById(id);

    if (!release) {
      throw new AppError('Release does not exist.');
    }

    release.name = name;
    release.paid = paid;

    if (release.customer_id !== customer_id) {
      release.customer_id = customer_id;
      const customer = await this.customersRepository.findById(customer_id);

      if (customer) {
        release.customer = customer;
      }
    }

    await this.releasesRepository.save(release);

    return release;
  }
}

export { UpdateReleaseService };
