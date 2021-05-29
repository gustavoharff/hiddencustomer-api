import ISendNotificationDTO from '../dtos/ISendNotificationDTO';

export default interface INotificationProvider {
  sendNotification(data: ISendNotificationDTO): Promise<string>;
  cancelNotification(notification_id: string): Promise<void>;
}
