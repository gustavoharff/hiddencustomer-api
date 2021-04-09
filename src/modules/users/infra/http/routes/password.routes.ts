import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import { ForgotPasswordController } from '@modules/users/infra/http/controllers/ForgotPasswordController';
import { ResetPasswordController } from '@modules/users/infra/http/controllers/ResetPasswordController';

export const passwordsRouter = Router();

const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordsRouter.get(
  '/check/:token',
  celebrate({
    [Segments.PARAMS]: {
      token: Joi.string().required(),
    },
  }),
  forgotPasswordController.index,
);

passwordsRouter.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  forgotPasswordController.create,
);

passwordsRouter.post(
  '/reset',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
  resetPasswordController.create,
);
