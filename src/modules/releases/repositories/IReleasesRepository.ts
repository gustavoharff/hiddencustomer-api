import Release from '@modules/releases/infra/typeorm/entities/Release';

import ICreateReleaseDTO from '@modules/releases/dtos/ICreateReleaseDTO';

export default interface IReleasesRepository {
  create(data: ICreateReleaseDTO): Promise<Release>;
  save(release: Release): Promise<Release>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Release | undefined>;
  findByCustomer(customer_id: string): Promise<Release[]>;
  findByCompany(company_id: string): Promise<Release[]>;
}
