import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreatePermissionService from '@modules/users/services/CreatePermissionService';

class PermissionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    const { permission_id } = request.user;

    const createPermission = container.resolve(CreatePermissionService);

    const permission = await createPermission.execute({ name, permission_id });

    return response.json(permission);
  }
}

export default PermissionsController;
