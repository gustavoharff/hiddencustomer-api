import { Request, Response, NextFunction } from 'express';

import { AppError } from '@shared/errors/AppError';

export function ensureAdministrator(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const { permission } = request.user;

  if (permission !== 'admin') {
    throw new AppError(
      "You don't have permission to execute this action.",
      401,
    );
  }

  return next();
}
