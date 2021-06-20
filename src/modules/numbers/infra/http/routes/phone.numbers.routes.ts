import { Router } from 'express';

import { ensureAuthenticated } from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { PhoneNumbersController } from '@modules/numbers/infra/http/controllers/PhoneNumbersController';

export const phoneNumbersRouter = Router();

const phoneNumbersController = new PhoneNumbersController();

phoneNumbersRouter.use(ensureAuthenticated);

phoneNumbersRouter.get('/', phoneNumbersController.index);

phoneNumbersRouter.post('/', phoneNumbersController.create);

phoneNumbersRouter.delete('/:id', phoneNumbersController.delete);
