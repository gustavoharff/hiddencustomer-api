import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateReleaseGroupService } from '@modules/releases/services/CreateReleaseGroupService';
import { DeleteReleaseGroupService } from '@modules/releases/services/DeleteReleaseGroupService';
import { ListReleaseGroupsService } from '@modules/releases/services/ListReleaseGroupsService';

export class ReleaseGroupsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const listReleseGroups = container.resolve(ListReleaseGroupsService);

    const groups = await listReleseGroups.execute({
      release_id: id,
    });

    return response.json(groups);
  }

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
