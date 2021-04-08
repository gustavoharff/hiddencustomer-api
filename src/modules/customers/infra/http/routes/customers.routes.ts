import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import { ensureAuthenticated } from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { ensureClient } from '@modules/users/infra/http/middlewares/ensureClient';

import { CustomersController } from '@modules/customers/infra/http/controllers/CustomersController';
import { UserCustomersController } from '@modules/customers/infra/http/controllers/UserCustomersController';

export const customersRouter = Router();

const customersController = new CustomersController();
const userCustomersController = new UserCustomersController();

customersRouter.use(ensureAuthenticated);

customersRouter.get('/me', userCustomersController.index);

customersRouter.post(
  '/',
  ensureClient,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  customersController.create,
);
