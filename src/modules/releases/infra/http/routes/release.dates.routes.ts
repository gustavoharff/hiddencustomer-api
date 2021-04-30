import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import { ensureAuthenticated } from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import { ReleaseDatesController } from '@modules/releases/infra/http/controllers/ReleaseDatesController';

export const releaseDatesRouter = Router();
const releaseDatesController = new ReleaseDatesController();

releaseDatesRouter.use(ensureAuthenticated);

releaseDatesRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  releaseDatesController.index,
);

releaseDatesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      release_id: Joi.string().uuid().required(),
      date: Joi.string().required(),
    },
  }),
  releaseDatesController.create,
);

releaseDatesRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  releaseDatesController.delete,
);
