import { Request, Response, NextFunction } from 'express';

import { AppError } from '@shared/errors/AppError';

export function ensureClient(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const { permission } = request.user;

  if (permission === 'user') {
    throw new AppError(
      "You don't have permission to execute this action.",
      401,
    );
  }

  return next();
}
