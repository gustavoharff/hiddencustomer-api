import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListUserCompanyService from '@modules/companies/services/ListUserCompanyService';

class CompaniesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { company_id } = request.user;

    const listUserCompany = container.resolve(ListUserCompanyService);

    const company = await listUserCompany.execute({ company_id });

    return response.json(classToClass(company));
  }
}

export default CompaniesController;
