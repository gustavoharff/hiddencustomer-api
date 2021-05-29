import axios from 'axios';

import INotificationProvider from '../models/INotificationProvider';

import ISendNotificationDTO from '../dtos/ISendNotificationDTO';

interface IFilters {
  field?: string;
  relation?: string;
  value?: string;
  operator?: 'OR';
}

export class OneSignalProvider implements INotificationProvider {
  private client = axios.create({
    baseURL: 'https://onesignal.com/api/v1',
    headers: {
      Authorization: 'Basic ZGZhYTRiMTUtNmYxNC00YmZhLWIzZjEtZmU2NjYwZDljZmY5',
    },
  });

  public async sendNotification({
    to,
    heading,
    date,
    body,
  }: ISendNotificationDTO): Promise<string> {
    const emails = to.map(email => ({
      field: 'email',
      relation: '=',
      value: email,
    })) as IFilters[];

    emails.forEach((e, index) => {
      emails.splice(index * 2 + 1, 0, { operator: 'OR' });
    });

    const response = await this.client.post('/notifications', {
      app_id: 'e49de3b9-9f90-4a03-a503-fe45126e8ba0',
      headings: { en: heading },
      contents: { en: body },
      send_after: date,
      channel_for_external_user_ids: 'push',
      filters: emails,
    });

    return response.data.id;
  }

  public async cancelNotification(notification_id: string): Promise<void> {
    try {
      await this.client.delete(
        `/notifications/${notification_id}?app_id=e49de3b9-9f90-4a03-a503-fe45126e8ba0`,
      );
    } catch (err) {
      console.log(err.message);
    }
  }
}
