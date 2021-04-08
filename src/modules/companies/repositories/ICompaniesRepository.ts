import { Company } from '@modules/companies/infra/typeorm/entities/Company';

export interface ICompaniesRepository {
  create(name: string): Promise<Company>;
  findById(id: string): Promise<Company | undefined>;
  findAll(): Promise<Company[]>;
  save(company: Company): Promise<Company>;
}
