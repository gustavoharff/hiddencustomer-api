import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { AppError } from '@shared/errors/AppError';

import { authConfig } from '@config/auth';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

interface ISubjectParsed {
  user: {
    id: string;
    permission: 'admin' | 'client' | 'user';
    company_id: string;
  };
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded as ITokenPayload;

    const subject: ISubjectParsed = JSON.parse(sub);

    request.user = {
      id: subject.user.id,
      permission: subject.user.permission,
      company_id: subject.user.company_id,
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT token', 440);
  }
}
