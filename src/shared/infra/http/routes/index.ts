import { Router } from 'express';

import { usersRouter } from '@modules/users/infra/http/routes/users.routes';
import { passwordsRouter } from '@modules/users/infra/http/routes/password.routes';
import { profileRouter } from '@modules/users/infra/http/routes/profile.routes';
import { authorizationRouter } from '@modules/users/infra/http/routes/auth.routes';

import { phoneNumbersRouter } from '@modules/numbers/infra/http/routes/phone.numbers.routes';

import { companiesRouter } from '@modules/companies/infra/http/routes/companies.routes';
import { customersRouter } from '@modules/customers/infra/http/routes/customers.routes';
import { customerRouter } from '@modules/customers/infra/http/routes/customer.routes';
import { releasesRouter } from '@modules/releases/infra/http/routes/releases.routes';
import { releaseRouter } from '@modules/releases/infra/http/routes/release.routes';
import { releaseDatesRouter } from '@modules/releases/infra/http/routes/release.dates.routes';
import { releasesDatesRouter } from '@modules/releases/infra/http/routes/releases.dates.routes';
import { releaseDateGroupsRouter } from '@modules/releases/infra/http/routes/release.date.groups.routes';
import { releaseGroupsRouter } from '@modules/releases/infra/http/routes/release.groups.routes';
import { releasesGroupsRouter } from '@modules/releases/infra/http/routes/releases.groups.routes';

export const routes = Router();

routes.use('/users', usersRouter);
routes.use('/me/password', passwordsRouter);
routes.use('/me', profileRouter);
routes.use('/auth', authorizationRouter);

routes.use('/numbers', phoneNumbersRouter);

routes.use('/companies', companiesRouter);
routes.use('/customer', customerRouter);
routes.use('/customers', customersRouter);
routes.use('/releases', releasesRouter);
routes.use('/release', releaseRouter);
routes.use('/release/dates', releaseDatesRouter);
routes.use('/releases/dates', releasesDatesRouter);
routes.use('/release/groups', releaseGroupsRouter);
routes.use('/release/date/groups', releaseDateGroupsRouter);
routes.use('/releases/groups', releasesGroupsRouter);
