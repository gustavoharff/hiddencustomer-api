import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListCompaniesService } from '@modules/companies/services/ListCompaniesService';
import { CreateCompanyService } from '@modules/companies/services/CreateCompanyService';
import { UpdateCompanyService } from '@modules/companies/services/UpdateCompanyService';

export class CompaniesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listCompanies = container.resolve(ListCompaniesService);

    const companies = await listCompanies.execute();

    return response.json(companies);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createCompany = container.resolve(CreateCompanyService);

    const company = await createCompany.execute({ name });

    return response.json(company);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    const { company_id } = request.user;

    const updateCompany = container.resolve(UpdateCompanyService);

    const company = await updateCompany.execute({
      id: company_id,
      name,
    });

    return response.json(company);
  }
}
