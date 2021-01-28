import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateCompanyService from '@modules/companies/services/CreateCompanyService';
import UpdateCompanyService from '@modules/companies/services/UpdateCompanyService';

class CompaniesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createCompany = container.resolve(CreateCompanyService);

    const company = await createCompany.execute(name);

    return response.json(classToClass(company));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    const { id } = request.params;
    const { permission_id } = request.user;

    const updateCompany = container.resolve(UpdateCompanyService);

    const company = await updateCompany.execute({ id, name, permission_id });

    return response.json(classToClass(company));
  }
}

export default CompaniesController;
