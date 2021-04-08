import { getRepository, Repository } from 'typeorm';

import { IReleasesRepository } from '@modules/releases/repositories/IReleasesRepository';

import { Release } from '@modules/releases/infra/typeorm/entities/Release';
import { ICreateReleaseDTO } from '@modules/releases/dtos/ICreateReleaseDTO';

export class ReleasesRepository implements IReleasesRepository {
  private ormRepository: Repository<Release>;

  constructor() {
    this.ormRepository = getRepository(Release);
  }

  public async create({
    name,
    customer_id,
    company_id,
  }: ICreateReleaseDTO): Promise<Release> {
    const release = this.ormRepository.create({
      name,
      paid: false,
      customer_id,
      company_id,
    });

    await this.ormRepository.save(release);

    return release;
  }

  public async save(release: Release): Promise<Release> {
    return this.ormRepository.save(release);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async findById(id: string): Promise<Release | undefined> {
    const release = await this.ormRepository.findOne(id);

    return release;
  }

  public async findByCustomer(customer_id: string): Promise<Release[]> {
    const releases = await this.ormRepository.find({
      where: { customer_id },
      order: { name: 'ASC' },
    });

    return releases;
  }

  public async findByCompany(company_id: string): Promise<Release[]> {
    const releases = await this.ormRepository.find({
      where: { company_id },
      order: { name: 'ASC' },
    });

    return releases;
  }
}
