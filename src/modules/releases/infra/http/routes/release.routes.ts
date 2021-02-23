import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import { ReleaseController } from '@modules/releases/infra/http/controllers/ReleaseController';

const releaseRouter = Router();
const releaseController = new ReleaseController();

releaseRouter.use(ensureAuthenticated);

releaseRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  releaseController.index,
);

export { releaseRouter };