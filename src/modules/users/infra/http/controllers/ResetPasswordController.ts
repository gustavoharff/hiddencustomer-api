import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ResetPasswordService } from '@modules/users/services/ResetPasswordService';

export class ResetPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { password, token } = request.body;

    const ResetPassword = container.resolve(ResetPasswordService);

    await ResetPassword.execute({ password, token });

    return response.status(204).json();
  }
}
