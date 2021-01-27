import { Router } from 'express';

import companiesRouter from '@modules/companies/infra/http/routes/companies.routes';

import permissionsRouter from '@modules/users/infra/http/routes/permissions.routes';
import usersRouter from '../../../../modules/users/infra/http/routes/users.routes';
import profileRouter from '../../../../modules/users/infra/http/routes/profile.routes';
import sessionsRouter from '../../../../modules/users/infra/http/routes/sessions.routes';

const routes = Router();

routes.use('/companies', companiesRouter);

routes.use('/users', usersRouter);
routes.use('/profile', profileRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/permissions', permissionsRouter);

export default routes;
