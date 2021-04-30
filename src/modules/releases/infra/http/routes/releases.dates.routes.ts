import { Router } from 'express';

import { ensureAuthenticated } from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import { CompanyReleaseDatesController } from '@modules/releases/infra/http/controllers/CompanyReleaseDatesController';

export const releasesDatesRouter = Router();
const companyReleaseDatesController = new CompanyReleaseDatesController();

releasesDatesRouter.use(ensureAuthenticated);

releasesDatesRouter.get('/company', companyReleaseDatesController.index);
