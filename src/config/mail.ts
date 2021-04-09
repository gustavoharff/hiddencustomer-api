interface IMailConfig {
  driver: 'ses' | 'mailtrap';

  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export const mailConfig = {
  driver: process.env.MAIL_DRIVER || 'mailtrap',

  defaults: {
    from: {
      email: 'gustavo@harff.dev',
      name: 'Cliente Oculto',
    },
  },
} as IMailConfig;
