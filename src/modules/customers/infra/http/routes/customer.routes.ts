import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import { ensureAuthenticated } from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import { CustomerController } from '@modules/customers/infra/http/controllers/CustomerController';

import { ensureClient } from '@modules/users/infra/http/middlewares/ensureClient';

export const customerRouter = Router();

const customerController = new CustomerController();

customerRouter.use(ensureAuthenticated);

customerRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  customerController.index,
);

customerRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  customerController.update,
);

customerRouter.delete(
  '/:id',
  ensureClient,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  customerController.delete,
);
