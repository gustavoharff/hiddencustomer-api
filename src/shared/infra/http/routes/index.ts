import { Router } from 'express';

import { usersRouter } from '@modules/users/infra/http/routes/users.routes';
import { profileRouter } from '@modules/users/infra/http/routes/profile.routes';
import { authorizationRouter } from '@modules/users/infra/http/routes/auth.routes';

import { companiesRouter } from '@modules/companies/infra/http/routes/companies.routes';
import { customersRouter } from '@modules/customers/infra/http/routes/customers.routes';
import { customerRouter } from '@modules/customers/infra/http/routes/customer.routes';
import { releasesRouter } from '@modules/releases/infra/http/routes/releases.routes';
import { releaseRouter } from '@modules/releases/infra/http/routes/release.routes';
import { datesRouter } from '@modules/releases/infra/http/routes/dates.routes';
import { releaseGroupsRouter } from '@modules/releases/infra/http/routes/release.groups.routes';
import { releasesGroupsRouter } from '@modules/releases/infra/http/routes/releases.groups.routes';

export const routes = Router();

routes.use('/users', usersRouter);
routes.use('/me', profileRouter);
routes.use('/auth', authorizationRouter);

routes.use('/companies', companiesRouter);
routes.use('/customer', customerRouter);
routes.use('/customers', customersRouter);
routes.use('/releases', releasesRouter);
routes.use('/release', releaseRouter);
routes.use('/release/dates', datesRouter);
routes.use('/release/groups', releaseGroupsRouter);
routes.use('/releases/groups', releasesGroupsRouter);
