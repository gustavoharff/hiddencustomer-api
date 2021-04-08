import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateReleaseGroupService } from '@modules/releases/services/CreateReleaseGroupService';
import { DeleteReleaseGroupService } from '@modules/releases/services/DeleteReleaseGroupService';

export class ReleaseGroupsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, type, release_id } = request.body;
    const { company_id } = request.user;

    const createReleaseGroup = container.resolve(CreateReleaseGroupService);

    const releaseGroup = await createReleaseGroup.execute({
      name,
      type,
      release_id,
      company_id,
    });

    return response.json(releaseGroup);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteReleaseGroup = container.resolve(DeleteReleaseGroupService);

    await deleteReleaseGroup.execute({
      id,
    });

    return response.send();
  }
}
