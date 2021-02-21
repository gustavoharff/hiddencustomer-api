import { getRepository, Repository } from 'typeorm';

import { IReleaseDatesRepository } from '@modules/releases/repositories/IReleaseDatesRepository';

import { ReleaseDate } from '@modules/releases/infra/typeorm/entities/ReleaseDate';
import { ICreateReleaseDateDTO } from '@modules/releases/dtos/ICreateReleaseDateDTO';

class ReleaseDatesRepository implements IReleaseDatesRepository {
  private ormRepository: Repository<ReleaseDate>;

  constructor() {
    this.ormRepository = getRepository(ReleaseDate);
  }

  public async create({
    date,
    release_id,
  }: ICreateReleaseDateDTO): Promise<ReleaseDate> {
    const releaseDate = this.ormRepository.create({
      date: new Date(date),
      release_id,
    });

    await this.ormRepository.save(releaseDate);

    return releaseDate;
  }

  public async save(releaseDate: ReleaseDate): Promise<ReleaseDate> {
    return this.ormRepository.save(releaseDate);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async findById(id: string): Promise<ReleaseDate | undefined> {
    const releaseDate = await this.ormRepository.findOne(id);

    return releaseDate;
  }

  public async findByRelease(release_id: string): Promise<ReleaseDate[]> {
    const releaseDates = await this.ormRepository.find({
      where: { release_id },
      order: {
        date: 'DESC',
      },
    });

    return releaseDates;
  }
}

export { ReleaseDatesRepository };
