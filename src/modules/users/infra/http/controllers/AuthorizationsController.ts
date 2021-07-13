import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { container } from 'tsyringe';

import { AuthenticateUserService } from '@modules/users/services/AuthenticateUserService';
import { GoogleAuthenticateUserService } from '@modules/users/services/GoogleAuthenticateUserService';

export class AuthorizationsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUser.execute({ email, password });

    return response.json({ user: classToClass(user), token });
  }

  public async google(request: Request, response: Response): Promise<Response> {
    const { googleToken } = request.body;

    const googleAuthenticateUser = container.resolve(
      GoogleAuthenticateUserService,
    );

    const { user, token } = await googleAuthenticateUser.execute({
      googleToken,
    });

    return response.json({ user: classToClass(user), token });
  }
}
