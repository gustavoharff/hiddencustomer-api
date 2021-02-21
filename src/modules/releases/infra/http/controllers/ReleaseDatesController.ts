import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import { ListReleaseDatesService } from '@modules/releases/services/ListReleaseDatesService';
import { CreateReleaseDateService } from '@modules/releases/services/CreateReleaseDateService';
import { DeleteReleaseDateService } from '@modules/releases/services/DeleteReleaseDateService';

class ReleaseDatesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const listReleseDates = container.resolve(ListReleaseDatesService);

    const dates = await listReleseDates.execute({
      release_id: id,
    });

    return response.json(classToClass(dates));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { date, release_id } = request.body;

    const createReleaseDate = container.resolve(CreateReleaseDateService);

    const releaseDate = await createReleaseDate.execute({
      date,
      release_id,
    });

    return response.json(classToClass(releaseDate));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteReleaseDate = container.resolve(DeleteReleaseDateService);

    await deleteReleaseDate.execute({ id });

    return response.send();
  }
}

export { ReleaseDatesController };
