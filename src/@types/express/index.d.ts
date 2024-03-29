/* eslint-disable @typescript-eslint/naming-convention */

declare namespace Express {
  export interface Request {
    user: {
      id: string;
      permission: 'admin' | 'client' | 'user';
      company_id: string;
    };
  }
}
