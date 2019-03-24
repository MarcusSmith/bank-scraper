import * as express from 'express';
import { login } from '../middleware/login';

export const register = (app: express.Application) => {
  app.get('/health', (req, res) => {
    res.send('Looking good, feeling good');
  });

  app.use('/banks/:bankName', login);
  app.get('/banks/:bankName/test', (req: any, res) => {
    res.sendStatus(204);
  });
};
