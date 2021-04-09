import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { SendForgotPasswordEmailService } from '@modules/users/services/SendForgotPasswordEmailService';
import { CheckResetPasswordTokenService } from '@modules/users/services/CheckResetPasswordTokenService';

export class ForgotPasswordController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { token } = request.params;

    const checkResetPasswordToken = container.resolve(
      CheckResetPasswordTokenService,
    );

    await checkResetPasswordToken.execute({ token: Number(token) });

    return response.json();
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendForgotPasswordEmail = container.resolve(
      SendForgotPasswordEmailService,
    );

    await sendForgotPasswordEmail.execute({ email });

    return response.status(204).json();
  }
}
