import { injectable, inject } from 'tsyringe';

import ICompaniesRepository from '@modules/companies/repositories/ICompaniesRepository';
import IPermissionsRepository from '@modules/users/repositories/IPermissionsRepository';

import Company from '@modules/companies/infra/typeorm/entities/Company';

import IUpdateCompanyDTO from '@modules/companies/dtos/IUpdateCompanyDTO';

import AppError from '@shared/errors/AppError';

@injectable()
class CreateCompanyService {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,

    @inject('PermissionsRepository')
    private permissionsRepository: IPermissionsRepository,
  ) {}

  public async execute({
    id,
    name,
    permission_id,
  }: IUpdateCompanyDTO): Promise<Company> {
    if (!permission_id) {
      throw new AppError("You don't have permission!", 401);
    }

    const checkedPermission = await this.permissionsRepository.findById(
      permission_id,
    );

    if (!checkedPermission) {
      throw new AppError('Permission does not exists!');
    }

    if (checkedPermission.name !== 'admin') {
      throw new AppError("You don't have permission!", 401);
    }

    const company = await this.companiesRepository.findById(id);

    if (!company) {
      throw new AppError('Company does not exists!');
    }

    company.name = name;

    await this.companiesRepository.save(company);

    return company;
  }
}

export default CreateCompanyService;
