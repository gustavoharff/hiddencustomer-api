import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import { CustomerController } from '@modules/customers/infra/http/controllers/CustomerController';

const customerRouter = Router();
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

export { customerRouter };
