import { injectable, inject } from 'tsyringe';

import { IReleaseDatesRepository } from '@modules/releases/repositories/IReleaseDatesRepository';

import { AppError } from '@shared/errors/AppError';
import INotificationProvider from '@shared/container/providers/NotificationProvider/models/INotificationProvider';

interface IRequest {
  id: string;
}

@injectable()
export class DeleteReleaseDateService {
  constructor(
    @inject('ReleaseDatesRepository')
    private releaseDatesRepository: IReleaseDatesRepository,

    @inject('NotificationProvider')
    private notificationProvider: INotificationProvider,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    const date = await this.releaseDatesRepository.findById(id);

    if (!date) {
      throw new AppError('Release date does not exist.');
    }

    if (date.notification_id) {
      await this.notificationProvider.cancelNotification(date.notification_id);
    }

    await this.releaseDatesRepository.delete(id);
  }
}
