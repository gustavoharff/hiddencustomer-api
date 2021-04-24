import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import { ensureAuthenticated } from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import { ReleaseGroupsController } from '@modules/releases/infra/http/controllers/ReleaseGroupsController';

export const releaseGroupsRouter = Router();
const releaseGroupsController = new ReleaseGroupsController();

releaseGroupsRouter.use(ensureAuthenticated);

releaseGroupsRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  releaseGroupsController.index,
);

releaseGroupsRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      type: Joi.string().required(),
      release_date_id: Joi.string().uuid().empty(''),
    },
  }),
  releaseGroupsController.update,
);

releaseGroupsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      release_id: Joi.string().uuid().required(),
      release_date_id: Joi.string().uuid().empty(''),
      name: Joi.string().required(),
      type: Joi.string().required(),
    },
  }),
  releaseGroupsController.create,
);

releaseGroupsRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  releaseGroupsController.delete,
);
