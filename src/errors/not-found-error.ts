import { StatusError } from './status-error';

export class NotFoundError extends StatusError {
  constructor(message: string = 'Not found') {
    super(404, message);
  }
}
