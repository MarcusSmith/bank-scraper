import express from 'express';
import { config } from './config';
import * as routes from './routes';

const app = express();

routes.register(app);

app.listen(config.port, () => {
  console.log(`server started at http://localhost:${config.port}`);
});
