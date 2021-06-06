import { injectable, inject } from 'tsyringe';

import { IReleasesRepository } from '@modules/releases/repositories/IReleasesRepository';
import { ICustomersRepository } from '@modules/customers/repositories/ICustomersRepository';

import { Release } from '@modules/releases/infra/typeorm/entities/Release';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  name: string;
  paid: boolean;
  customer_id: string;
  company_id: string;
}

@injectable()
export class CreateReleaseService {
  constructor(
    @inject('ReleasesRepository')
    private releasesRepository: IReleasesRepository,

    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({
    name,
    paid,
    customer_id,
    company_id,
  }: IRequest): Promise<Release> {
    const customer = await this.customersRepository.findById(customer_id);

    if (!customer) {
      throw new AppError('Customer does not exist.');
    }

    const { id } = await this.releasesRepository.create({
      name,
      paid,
      customer_id,
      company_id,
    });

    const release = await this.releasesRepository.findById(id);

    return release as Release;
  }
}
