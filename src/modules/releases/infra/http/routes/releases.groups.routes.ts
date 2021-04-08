import { Router } from 'express';

import { ensureAuthenticated } from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import { CompanyReleasesGroupsController } from '@modules/releases/infra/http/controllers/CompanyReleasesGroupsController';

export const releasesGroupsRouter = Router();

const companyReleasesGroupsController = new CompanyReleasesGroupsController();

releasesGroupsRouter.use(ensureAuthenticated);

releasesGroupsRouter.get('/', companyReleasesGroupsController.index);
