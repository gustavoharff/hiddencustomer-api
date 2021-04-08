import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListCompanyReleasesGroupsService } from '@modules/releases/services/ListCompanyReleasesGroupsService';

export class CompanyReleasesGroupsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { company_id } = request.user;

    const listCompanyRelesesGroups = container.resolve(
      ListCompanyReleasesGroupsService,
    );

    const releasesGroups = await listCompanyRelesesGroups.execute({
      company_id,
    });

    return response.json(releasesGroups);
  }
}
