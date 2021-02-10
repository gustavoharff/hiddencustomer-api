import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import sessionsRouter from '@modules/users/infra/http/routes/auth.routes';

import companiesRouter from '@modules/companies/infra/http/routes/companies.routes';
import customersRouter from '@modules/customers/infra/http/routes/customers.routes';
import releasesRouter from '@modules/releases/infra/http/routes/releases.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/me', profileRouter);
routes.use('/auth', sessionsRouter);

routes.use('/companies', companiesRouter);
routes.use('/customers', customersRouter);
routes.use('/releases', releasesRouter);

export default routes;
