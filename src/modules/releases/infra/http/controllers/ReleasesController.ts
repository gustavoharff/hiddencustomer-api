import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateReleaseService from '@modules/releases/services/CreateReleaseService';
import ListCompanyReleses from '@modules/releases/services/ListCompanyReleses';

class ReleasesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { company_id } = request.user;

    const listCompanyReleses = container.resolve(ListCompanyReleses);

    const releases = await listCompanyReleses.execute({
      company_id,
    });

    return response.json(classToClass(releases));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, customer_id } = request.body;
    const { company_id } = request.user;

    const createRelease = container.resolve(CreateReleaseService);

    const release = await createRelease.execute({
      name,
      customer_id,
      company_id,
    });

    return response.json(classToClass(release));
  }
}

export default ReleasesController;