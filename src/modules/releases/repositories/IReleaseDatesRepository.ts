import { ReleaseDate } from '@modules/releases/infra/typeorm/entities/ReleaseDate';

import { ICreateReleaseDateDTO } from '@modules/releases/dtos/ICreateReleaseDateDTO';

interface IReleaseDatesRepository {
  create(data: ICreateReleaseDateDTO): Promise<ReleaseDate>;
  save(releaseDate: ReleaseDate): Promise<ReleaseDate>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<ReleaseDate | undefined>;
  findByRelease(release_id: string): Promise<ReleaseDate[]>;
  findByCompany(company_id: string): Promise<ReleaseDate[]>;
}

export { IReleaseDatesRepository };
