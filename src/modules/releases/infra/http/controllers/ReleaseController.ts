import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListReleaseService } from '@modules/releases/services/ListReleaseService';
import { UpdateReleaseService } from '@modules/releases/services/UpdateReleaseService';
import { DeleteReleaseService } from '@modules/releases/services/DeleteReleaseService';

export class ReleaseController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const listRelese = container.resolve(ListReleaseService);

    const release = await listRelese.execute({
      release_id: id,
    });

    return response.json(release);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { annotations, name, paid, customer_id } = request.body;

    const updateRelease = container.resolve(UpdateReleaseService);

    const release = await updateRelease.execute({
      id,
      name,
      paid,
      annotations,
      customer_id,
    });

    return response.json(release);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteRelease = container.resolve(DeleteReleaseService);

    await deleteRelease.execute({ id });

    return response.send();
  }
}
