import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICompaniesRepository from '@modules/companies/repositories/ICompaniesRepository';
import IPermissionsRepository from '@modules/users/repositories/IPermissionsRepository';

import Company from '@modules/companies/infra/typeorm/entities/Company';

import ICreateCompanyDTO from '../dtos/ICreateCompanyDTO';

@injectable()
class CreateCompanyService {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,

    @inject('PermissionsRepository')
    private permissionsRepository: IPermissionsRepository,
  ) {}

  public async execute({
    name,
    permission_id,
  }: ICreateCompanyDTO): Promise<Company> {
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

    const company = await this.companiesRepository.create(name);

    return company;
  }
}

export default CreateCompanyService;
