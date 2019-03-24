import { StatusError } from './status-error';

export class UnauthenticatedError extends StatusError {
  constructor(message: string = 'Unauthenticated') {
    super(401, message);
  }
}
