import type { NormalizedUser } from '../modules/users/users.service.js';

declare global {
  namespace Express {
    interface Request {
      user?: NormalizedUser;
    }
  }
}

export {};
