import nodemailer, { Transporter } from 'nodemailer';
import { inject, injectable } from 'tsyringe';
import asw from 'aws-sdk';

import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTemplateProvider';
import IMailProvider from '../models/IMailProvider';

import ISendMailDTO from '../dtos/ISendMailDTO';

@injectable()
export class SESMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    this.client = nodemailer.createTransport({
      SES: new asw.SES({
        apiVersion: '2010-12-01',
        region: 'us-east-1',
        credentials: {
          accessKeyId: 'AKIATMZNI6MHOC4EVTPO',
          secretAccessKey: '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',
        },
      }),
    });
  }

  public async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMailDTO): Promise<void> {
    await this.client.sendMail({
      from: {
        name: from?.name || 'Cliente Oculto',
        address: from?.email || 'gustavo@harff.dev',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    });
  }
}
