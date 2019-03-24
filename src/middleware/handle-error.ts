import express from 'express';
import { StatusError } from '../errors/status-error';

export async function handleError(err: Error, req: express.Request, res: express.Response, next: any) {
  if (err instanceof StatusError) {
    res.status(err.statusCode).send({ error: err.message });
  } else {
    console.log('Unexpected error:', err.stack);
    res.status(500).send({ error: 'Internal Error' });
  }
}
