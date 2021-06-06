import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateReleaseService } from '@modules/releases/services/CreateReleaseService';
import { ListCompanyReleasesService } from '@modules/releases/services/ListCompanyRelesesService';

export class ReleasesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { company_id } = request.user;

    const listCompanyReleses = container.resolve(ListCompanyReleasesService);

    const releases = await listCompanyReleses.execute({
      company_id,
    });

    return response.json(releases);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, paid, customer_id } = request.body;
    const { company_id } = request.user;

    const createRelease = container.resolve(CreateReleaseService);

    const release = await createRelease.execute({
      name,
      paid,
      customer_id,
      company_id,
    });

    return response.json(release);
  }
}
