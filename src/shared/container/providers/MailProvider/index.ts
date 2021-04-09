import { container } from 'tsyringe';

import { mailConfig } from '@config/mail';

import IMailProvider from './models/IMailProvider';

import { MailTrapMailProvider } from './implementations/MailtrapMailProvider';
import { SESMailProvider } from './implementations/SESMailProvider';

const providers = {
  mailtrap: MailTrapMailProvider,
  ses: SESMailProvider,
};

container.registerSingleton<IMailProvider>(
  'MailProvider',
  providers[mailConfig.driver],
);
