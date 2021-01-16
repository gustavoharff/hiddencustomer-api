import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { container } from 'tsyringe';

import AuthenticateUserService from '../../../services/AuthenticateUserService';
import ShowProfileService from '../../../services/ShowProfileService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUser.execute({ email, password });

    const showProfile = container.resolve(ShowProfileService);

    const profile = await showProfile.execute({ user_id: user.id });

    return response.json({ user: classToClass(profile), token });
  }
}
