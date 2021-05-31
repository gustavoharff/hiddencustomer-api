import { injectable, inject } from 'tsyringe';
import moment from 'moment';
import 'moment/locale/pt-br';

import { IReleasesRepository } from '@modules/releases/repositories/IReleasesRepository';
import { IReleaseDatesRepository } from '@modules/releases/repositories/IReleaseDatesRepository';

import { AppError } from '@shared/errors/AppError';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import INotificationProvider from '@shared/container/providers/NotificationProvider/models/INotificationProvider';
import { ReleaseDate } from '../infra/typeorm/entities/ReleaseDate';

interface IRequest {
  release_id: string;
  company_id: string;
  date: string;
}

@injectable()
export class CreateReleaseDateService {
  constructor(
    @inject('ReleasesRepository')
    private releasesRepository: IReleasesRepository,

    @inject('ReleaseDatesRepository')
    private releaseDatesRepository: IReleaseDatesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('NotificationProvider')
    private notificationProvider: INotificationProvider,
  ) {}

  public async execute({
    release_id,
    company_id,
    date,
  }: IRequest): Promise<ReleaseDate> {
    const release = await this.releasesRepository.findById(release_id);

    if (!release) {
      throw new AppError('Release does not exist.');
    }

    const releaseDate = await this.releaseDatesRepository.create({
      date,
      release_id,
      company_id,
    });

    const users = await this.usersRepository.findByCompany(company_id);

    let notificationId = null;

    console.log(moment(releaseDate.date).format());

    try {
      notificationId = await this.notificationProvider.sendNotification({
        to: users.map(user => user.email),
        date: moment(releaseDate.date).subtract(1, 'day').format(),
        heading: 'Lançamento se aproximando!',
        body: `Você tem um lançamento ${release.name} em ${moment(
          releaseDate.date,
        )
          .utc(true)
          .format('LLL')}!`,
      });
    } catch (err) {
      console.log(err);
    }

    if (notificationId) {
      releaseDate.notification_id = notificationId;
      await this.releaseDatesRepository.save(releaseDate);
    }

    return releaseDate;
  }
}
