import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import CompaniesController from '@modules/companies/infra/http/controllers/CompaniesController';
import UserCompanyController from '@modules/companies/infra/http/controllers/UserCompanyController';

const companiesRouter = Router();
const companiesController = new CompaniesController();
const userCompanyController = new UserCompanyController();

companiesRouter.use(ensureAuthenticated);

companiesRouter.get('/me', userCompanyController.index);

companiesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  companiesController.create,
);

companiesRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  companiesController.update,
);

export default companiesRouter;
