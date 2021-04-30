import { ReleaseGroup } from '@modules/releases/infra/typeorm/entities/ReleaseGroup';

import { ICreateReleaseGroupDTO } from '@modules/releases/dtos/ICreateReleaseGroupDTO';

export interface IReleaseGroupsRepository {
  create(data: ICreateReleaseGroupDTO): Promise<ReleaseGroup>;
  save(releaseDate: ReleaseGroup): Promise<ReleaseGroup>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<ReleaseGroup | undefined>;
  findByRelease(release_id: string): Promise<ReleaseGroup[]>;
  findByCompany(company_id: string): Promise<ReleaseGroup[]>;
  findByDate(date_id: string): Promise<ReleaseGroup[]>;
}
