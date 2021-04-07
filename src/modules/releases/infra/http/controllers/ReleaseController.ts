import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import { ListReleaseService } from '@modules/releases/services/ListReleaseService';
import { UpdateReleaseAnnotationsService } from '@modules/releases/services/UpdateReleaseAnnotationsService';
import { UpdateReleaseService } from '@modules/releases/services/UpdateReleaseService';

class ReleaseController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const listRelese = container.resolve(ListReleaseService);

    const release = await listRelese.execute({
      release_id: id,
    });

    return response.json(classToClass(release));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { annotations, name, paid, customer_id } = request.body;

    if (annotations || annotations === '') {
      const updateRelease = container.resolve(UpdateReleaseAnnotationsService);

      const release = await updateRelease.execute({
        id,
        annotations,
      });

      return response.json(classToClass(release));
    }

    const updateRelease = container.resolve(UpdateReleaseService);

    const release = await updateRelease.execute({
      id,
      customer_id,
      paid,
      name,
    });

    return response.json(classToClass(release));
  }
}

export { ReleaseController };
