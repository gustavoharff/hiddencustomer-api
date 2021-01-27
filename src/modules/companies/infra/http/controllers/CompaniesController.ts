import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCompanyService from '@modules/companies/services/CreateCompanyService';

class CompaniesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createCompany = container.resolve(CreateCompanyService);

    const company = await createCompany.execute(name);

    return response.json(company);
  }
}

export default CompaniesController;
