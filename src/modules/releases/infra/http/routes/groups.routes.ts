import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import { ReleaseGroupsController } from '@modules/releases/infra/http/controllers/ReleaseGroupsController';

const groupsRouter = Router();
const releaseGroupsController = new ReleaseGroupsController();

groupsRouter.use(ensureAuthenticated);

groupsRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  releaseGroupsController.index,
);

groupsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      release_id: Joi.string().uuid().required(),
      name: Joi.string().required(),
      type: Joi.string().required(),
    },
  }),
  releaseGroupsController.create,
);

groupsRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  releaseGroupsController.delete,
);

export { groupsRouter };
