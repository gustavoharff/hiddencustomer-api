import { Router } from 'express';

import { ensureAuthenticated } from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import { ReleaseDateGroupsController } from '@modules/releases/infra/http/controllers/ReleaseDateGroupsController';

export const releaseDateGroupsRouter = Router();
const releaseDateGroupsController = new ReleaseDateGroupsController();

releaseDateGroupsRouter.use(ensureAuthenticated);

releaseDateGroupsRouter.get('/:date_id', releaseDateGroupsController.index);
