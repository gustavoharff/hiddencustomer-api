import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import { UsersController } from '../controllers/UsersController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { ensureAdministrator } from '../middlewares/ensureAdministrator';

export const usersRouter = Router();

const usersController = new UsersController();

usersRouter.use(ensureAuthenticated);

usersRouter.get('/', ensureAdministrator, usersController.index);

usersRouter.post(
  '/',
  ensureAdministrator,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      company_id: Joi.string().required(),
      active: Joi.boolean().required(),
    },
  }),
  usersController.create,
);

usersRouter.put('/:id', ensureAdministrator, usersController.update);
