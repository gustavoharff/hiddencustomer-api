import Company from '@modules/companies/infra/typeorm/entities/Company';

export default interface ICompaniesRepository {
  create(name: string): Promise<Company>;
  findById(id: string): Promise<Company | undefined>;
  save(company: Company): Promise<Company>;
}
