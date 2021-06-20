import { container } from 'tsyringe';

import '@modules/users/providers';

import './providers';

import { ICompaniesRepository } from '@modules/companies/repositories/ICompaniesRepository';
import { CompaniesRepository } from '@modules/companies/infra/typeorm/repositories/CompaniesRepository';

import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';

import { IUserTokensRepository } from '@modules/users/repositories/IUserTokensRepository';
import { UserTokensRepository } from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import { IPhoneNumbersRepository } from '@modules/numbers/repositories/IPhoneNumbersRepository';
import { PhoneNumbersRepository } from '@modules/numbers/infra/typeorm/repositories/PhoneNumbersRepository';

import { ICustomersRepository } from '@modules/customers/repositories/ICustomersRepository';
import { CustomersRepository } from '@modules/customers/infra/typeorm/repositories/CustomersRepository';

import { IReleasesRepository } from '@modules/releases/repositories/IReleasesRepository';
import { ReleasesRepository } from '@modules/releases/infra/typeorm/repositories/ReleasesRepository';

import { IReleaseDatesRepository } from '@modules/releases/repositories/IReleaseDatesRepository';
import { ReleaseDatesRepository } from '@modules/releases/infra/typeorm/repositories/ReleaseDatesRepository';

import { IReleaseGroupsRepository } from '@modules/releases/repositories/IReleaseGroupsRepository';
import { ReleaseGroupsRepository } from '@modules/releases/infra/typeorm/repositories/ReleaseGroupsRepository';

container.registerSingleton<ICompaniesRepository>(
  'CompaniesRepository',
  CompaniesRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IPhoneNumbersRepository>(
  'PhoneNumbersRepository',
  PhoneNumbersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<ICustomersRepository>(
  'CustomersRepository',
  CustomersRepository,
);

container.registerSingleton<IReleasesRepository>(
  'ReleasesRepository',
  ReleasesRepository,
);

container.registerSingleton<IReleaseDatesRepository>(
  'ReleaseDatesRepository',
  ReleaseDatesRepository,
);

container.registerSingleton<IReleaseGroupsRepository>(
  'ReleaseGroupsRepository',
  ReleaseGroupsRepository,
);
