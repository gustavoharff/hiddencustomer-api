import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import { ShowProfileService } from '@modules/users/services/ShowProfileService';
import { UpdateUserPasswordService } from '@modules/users/services/UpdateUserPasswordService';
import { UpdateUserInfoService } from '@modules/users/services/UpdateUserInforService';

export class ProfileController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const showProfile = container.resolve(ShowProfileService);

    const user = await showProfile.execute({ user_id });

    return response.json(classToClass(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { old_password, password, name, email } = request.body;
    const user_id = request.user.id;

    if (old_password && password) {
      const updatePassword = container.resolve(UpdateUserPasswordService);

      const user = await updatePassword.execute({
        user_id,
        old_password,
        password,
      });

      return response.json(classToClass(user));
    }

    const updateInfo = container.resolve(UpdateUserInfoService);

    const user = await updateInfo.execute({ email, name, user_id });

    return response.json(classToClass(user));
  }
}
