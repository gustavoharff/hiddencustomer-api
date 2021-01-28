import { Router } from 'express';

import companiesRouter from '@modules/companies/infra/http/routes/companies.routes';

import usersRouter from '../../../../modules/users/infra/http/routes/users.routes';
import profileRouter from '../../../../modules/users/infra/http/routes/profile.routes';
import sessionsRouter from '../../../../modules/users/infra/http/routes/auth.routes';

const routes = Router();

routes.use('/companies', companiesRouter);

routes.use('/users', usersRouter);
routes.use('/me', profileRouter);
routes.use('/auth', sessionsRouter);

export default routes;
