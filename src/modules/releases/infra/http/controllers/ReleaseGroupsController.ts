import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import { ListReleaseGroupsService } from '@modules/releases/services/ListReleaseGroupsService';
import { CreateReleaseGroupService } from '@modules/releases/services/CreateReleaseGroupService';
import { DeleteReleaseGroupService } from '@modules/releases/services/DeleteReleaseGroupService';

class ReleaseGroupsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const listReleseGroups = container.resolve(ListReleaseGroupsService);

    const groups = await listReleseGroups.execute({
      release_id: id,
    });

    return response.json(classToClass(groups));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, type, release_id } = request.body;

    const createReleaseGroup = container.resolve(CreateReleaseGroupService);

    const releaseGroup = await createReleaseGroup.execute({
      name,
      type,
      release_id,
    });

    return response.json(classToClass(releaseGroup));
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

export { ReleaseGroupsController };
