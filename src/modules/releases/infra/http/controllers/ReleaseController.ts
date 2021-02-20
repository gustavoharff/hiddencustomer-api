import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import { ListReleaseService } from '@modules/releases/services/ListReleaseService';

class ReleaseController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const listRelese = container.resolve(ListReleaseService);

    const release = await listRelese.execute({
      release_id: id,
    });

    return response.json(classToClass(release));
  }
}

export { ReleaseController };
