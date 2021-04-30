import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListReleaseDateGroupsService } from '@modules/releases/services/ListReleaseDateGroupsService';

export class ReleaseDateGroupsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { date_id } = request.params;

    const listReleseDatesGroups = container.resolve(
      ListReleaseDateGroupsService,
    );

    const groups = await listReleseDatesGroups.execute({
      date_id,
    });

    return response.json(groups);
  }
}
