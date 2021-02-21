import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import { ReleaseDatesController } from '@modules/releases/infra/http/controllers/ReleaseDatesController';

const datesRouter = Router();
const releaseDatesController = new ReleaseDatesController();

datesRouter.use(ensureAuthenticated);

datesRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  releaseDatesController.index,
);

datesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      release_id: Joi.string().uuid().required(),
      date: Joi.string().required(),
    },
  }),
  releaseDatesController.create,
);

datesRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  releaseDatesController.delete,
);

export { datesRouter };
