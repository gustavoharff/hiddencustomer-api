import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import { AuthorizationsController } from '../controllers/AuthorizationsController';

export const authorizationRouter = Router();
const authorizationsController = new AuthorizationsController();

authorizationRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  authorizationsController.create,
);

authorizationRouter.post(
  '/oauth',
  celebrate({
    [Segments.BODY]: {
      googleToken: Joi.string().required(),
    },
  }),
  authorizationsController.google,
);
