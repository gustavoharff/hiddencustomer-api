import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListReleaseDatesService } from '@modules/releases/services/ListReleaseDatesService';
import { CreateReleaseDateService } from '@modules/releases/services/CreateReleaseDateService';
import { DeleteReleaseDateService } from '@modules/releases/services/DeleteReleaseDateService';

export class ReleaseDatesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const listReleseDates = container.resolve(ListReleaseDatesService);

    const dates = await listReleseDates.execute({
      release_id: id,
    });

    return response.json(dates);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { date, release_id } = request.body;
    const { company_id } = request.user;

    const createReleaseDate = container.resolve(CreateReleaseDateService);

    const releaseDate = await createReleaseDate.execute({
      date,
      release_id,
      company_id,
    });

    return response.json(releaseDate);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteReleaseDate = container.resolve(DeleteReleaseDateService);

    await deleteReleaseDate.execute({ id });

    return response.send();
  }
}
