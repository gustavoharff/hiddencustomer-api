import { getRepository, Repository } from 'typeorm';

import { IReleaseGroupsRepository } from '@modules/releases/repositories/IReleaseGroupsRepository';

import { ReleaseGroup } from '@modules/releases/infra/typeorm/entities/ReleaseGroup';

import { ICreateReleaseGroupDTO } from '@modules/releases/dtos/ICreateReleaseGroupDTO';

export class ReleaseGroupsRepository implements IReleaseGroupsRepository {
  private ormRepository: Repository<ReleaseGroup>;

  constructor() {
    this.ormRepository = getRepository(ReleaseGroup);
  }

  public async create({
    name,
    type,
    release_id,
    company_id,
  }: ICreateReleaseGroupDTO): Promise<ReleaseGroup> {
    const releaseGroup = this.ormRepository.create({
      name,
      type,
      release_id,
      company_id,
    });

    await this.ormRepository.save(releaseGroup);

    return releaseGroup;
  }

  public async save(releaseGroup: ReleaseGroup): Promise<ReleaseGroup> {
    return this.ormRepository.save(releaseGroup);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async findById(id: string): Promise<ReleaseGroup | undefined> {
    const releaseGroup = await this.ormRepository.findOne(id);

    return releaseGroup;
  }

  public async findByRelease(release_id: string): Promise<ReleaseGroup[]> {
    const releaseGroups = await this.ormRepository.find({
      where: { release_id },
      order: { name: 'ASC' },
    });

    return releaseGroups;
  }

  public async findByCompany(company_id: string): Promise<ReleaseGroup[]> {
    const releaseGroups = await this.ormRepository.find({
      where: { company_id },
    });

    return releaseGroups;
  }
}
