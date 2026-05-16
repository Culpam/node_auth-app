import type { RequestHandler } from 'express';
import { AppError } from '../errors/AppError.js';
import { validateAccessToken } from '../utils/jwt.js';

export const authMiddleware: RequestHandler = (req, _res, next) => {
  const authHeader = req.headers.authorization;

  const [type, token] = authHeader?.split(' ') || [];

  if (type !== 'Bearer' || !token) {
    throw new AppError(401, 'Invalid authorization header');
  }

  const userData = validateAccessToken(token);

  if (!userData) {
    throw new AppError(401, 'Invalid or expired token');
  }

  req.user = userData;

  next();
};
