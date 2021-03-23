import { injectable, inject } from 'tsyringe';

import IReleasesRepository from '@modules/releases/repositories/IReleasesRepository';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';

import AppError from '@shared/errors/AppError';

import Release from '../infra/typeorm/entities/Release';
import { IReleaseGroupsRepository } from '../repositories/IReleaseGroupsRepository';
import { IReleaseDatesRepository } from '../repositories/IReleaseDatesRepository';

interface IRequest {
  id: string;
  name: string;
  customer_id: string;
  paid: boolean;
}

interface IReleaseWithCounters extends Release {
  interval: Date[];
  dates_counter: number;
  groups_counter: number;
}

@injectable()
class UpdateReleaseService {
  constructor(
    @inject('ReleasesRepository')
    private releasesRepository: IReleasesRepository,

    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,

    @inject('ReleaseGroupsRepository')
    private releaseGroupsRepository: IReleaseGroupsRepository,

    @inject('ReleaseDatesRepository')
    private releaseDatesRepository: IReleaseDatesRepository,
  ) {}

  public async execute({
    id,
    name,
    paid,
    customer_id,
  }: IRequest): Promise<IReleaseWithCounters> {
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

    const groups = await this.releaseGroupsRepository.findByRelease(release.id);

    const dates = await this.releaseDatesRepository.findByRelease(release.id);

    return {
      ...release,
      dates_counter: dates.length,
      groups_counter: groups.length,
      interval: [dates[dates.length - 1].date, dates[0].date],
    };
  }
}

export { UpdateReleaseService };
