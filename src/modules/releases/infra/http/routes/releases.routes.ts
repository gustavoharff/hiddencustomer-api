import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import ReleasesController from '@modules/releases/infra/http/controllers/ReleasesController';

const releasesRouter = Router();
const releasesController = new ReleasesController();

releasesRouter.use(ensureAuthenticated);

releasesRouter.get('/', releasesController.index);

releasesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      customer_id: Joi.string().uuid().required(),
    },
  }),
  releasesController.create,
);

releasesRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  releasesController.delete,
);

export default releasesRouter;
